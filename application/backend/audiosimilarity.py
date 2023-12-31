import librosa
import audiosegment
import numpy as np
import sox
import matplotlib.pyplot as plt
from pydub import AudioSegment
from scipy.io.wavfile import read
from scipy import spatial
import scipy.signal as signal
import math
from scipy.ndimage import gaussian_laplace, gaussian_filter
from pydub.playback import play
from numpy import dot
from numpy.linalg import norm
from scipy.stats import pearsonr
from sklearn.metrics.pairwise import cosine_similarity
from scipy.spatial.distance import cosine
from scipy.spatial.distance import euclidean

def trimFile(path):
    ext = path.split(".")
    if ext[-1] == "m4a":
        data, rate = librosa.load(path, mono=False, duration=10)
        signaltrim, index = librosa.effects.trim(data, top_db=20)
        return signaltrim, rate
    else :
        data, rate = librosa.load(path, mono=False, duration=10)
        signaltrim, index = librosa.effects.trim(data, top_db=20)
        return signaltrim, rate

def calculate_iou_with_tolerance(set1, set2, threshold):
    similarity = 0

    for onset1 in set1:
        for onset2 in set2:
            if abs(onset1 - onset2) <= threshold:
                similarity += 1
                break

    iou = similarity / (len(set1) + len(set2) - similarity)
    return iou

def get_mfcc(audio, rate):
    mfcc = librosa.feature.mfcc(y=audio, sr=rate, n_mfcc=6)
    return mfcc

def scale_mfcc(mfcc):
    mfcc -= 0.75 if (mfcc-0.75) > 0 else 0
    mfcc /= 0.2 if (mfcc/0.2) <= 1 else 1
    return mfcc

def dtw_to_percent(dtw_distance):
    return (1 / (1 + dtw_distance)) * 100

def compare_chroma(chroma1, chroma2):
    chroma_distance = np.linalg.norm(chroma1 - chroma2)
    return chroma_distance

def compareFiles(path1, path2):
    audio1, rate1 = trimFile(path1)
    audio2, rate2 = trimFile(path2)

    # get ratio length
    duration1 = librosa.get_duration(y=audio1)
    duration2 = librosa.get_duration(y=audio2)

    # normalise the time
    if(duration1 < duration2):
        # slow down audio 1
        ratio = duration2/duration1
        audio1 = librosa.effects.time_stretch(y=audio1, rate=1/ratio)
        rate1 = round(rate1/ratio)
    else:
        ratio = duration1/duration2
        audio2 = librosa.effects.time_stretch(y=audio2, rate=1/ratio)
        rate2 = round(rate2/ratio)

    # Define the desired frequency range
    f_low = 300  # Lower frequency bound in Hz
    f_high = 4000  # Upper frequency bound in Hz

    # --------- PROCESS AUDIOS -----------

    # Convert to decibel spectogram
    spectogram1 = np.abs(librosa.stft(audio1))
    dbSpectogram1 = librosa.amplitude_to_db(spectogram1, ref=np.max)
    # make recurrence matrix for non-median filtering
    rec1 = librosa.segment.recurrence_matrix(dbSpectogram1, mode='affinity', metric='cosine', sparse=True)
    # filter spectogram to reduce noise
    spectogram_filter1 = np.minimum(dbSpectogram1, librosa.decompose.nn_filter(dbSpectogram1, rec=rec1, aggregate=np.average, metric='cosine'))

    # Convert to decibel spectogram
    spectogram2 = np.abs(librosa.stft(audio2))
    dbSpectogram2 = librosa.amplitude_to_db(spectogram2, ref=np.max)
    # make recurrence matrix for non-median filtering
    rec2 = librosa.segment.recurrence_matrix(dbSpectogram2, mode='affinity', metric='cosine', sparse=True)
    # filter spectogram to reduce noise
    spectogram_filter2 = np.minimum(dbSpectogram2, librosa.decompose.nn_filter(dbSpectogram2, rec=rec2, aggregate=np.average, metric='cosine'))

    # SCORE FACTOR ONE: TIMING & RHYTHM SCORE
    # sub-factor one --------- spectrogram correlation -----------

    flat_d1 = spectogram_filter1.flatten()
    flat_d2 = spectogram_filter2.flatten()

    pearson_correlation = np.corrcoef(flat_d1, flat_d2)[0, 1]

    # sub-factor two --------- onset detection & analysis -----------

    onset1 = librosa.onset.onset_detect(y=audio1, sr=rate1)
    onset2 = librosa.onset.onset_detect(y=audio2, sr=rate2)
    tolerance_threshold = 5

    estimated_iou = calculate_iou_with_tolerance(onset1, onset2, tolerance_threshold)

    # SCORE FACTOR TWO: FREQUENCY SCORE
    # sub-factor one --------- mel-frequency cepstral coefficients -----------

    mfcc1 = get_mfcc(audio1, rate1)
    mfcc2 = get_mfcc(audio2, rate2)

    cosine_distance = 1 - cosine(mfcc1.flatten(), mfcc2.flatten())
    mfcc_score = scale_mfcc(cosine_distance)

    # sub-factor two ---------  -----------

    
    # --------- RESULTS -----------

    rhythm_score = (pearson_correlation + estimated_iou) / 2
    intonation_score = (mfcc_score) 
    combined_score = (rhythm_score + intonation_score) / 2

    print("----------------------------------------")
    print("----------------------------------------")
    print("----------------------------------------")
    print("correlation: " + str(pearson_correlation))
    print("onset score: " + str(estimated_iou))
    print("mfcc dist: " + str(cosine_distance))
    print("mfcc: " + str(mfcc_score))
    print("----------------------------------------")
    print("----------------------------------------")
    print("----------------------------------------")
    print("rhythm score: " + str(rhythm_score))
    print("intonation score: " + str(intonation_score))
    print("combined: " + str(combined_score))
    print("----------------------------------------")
    print("----------------------------------------")
    print("----------------------------------------")

    return 100 * combined_score