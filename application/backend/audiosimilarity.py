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
from scipy.spatial.distance import euclidean
from scipy.spatial import distance

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
    mfcc = librosa.feature.mfcc(y=audio, sr=rate, n_mfcc=13)
    return mfcc

def normalise_mfcc(mfcc):
    mfcc -= 0.7 if (mfcc-0.7) > 0 else 0
    mfcc /= 0.25 if (mfcc-0.7) <= 1 else 1
    return mfcc

def compareFiles(path1, path2):

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

    # process audio 1
    b, a = signal.butter(10, [f_low, f_high], btype='bandpass', fs=rate1)
    filt_audio1 = signal.lfilter(b, a, audio1)
    # Convert to decibel spectogram
    spectogram1 = np.abs(librosa.stft(filt_audio1))
    dbSpectogram1 = librosa.amplitude_to_db(spectogram1, ref=np.max)
    # make recurrence matrix for non-median filtering
    rec1 = librosa.segment.recurrence_matrix(dbSpectogram1, mode='affinity', metric='cosine', sparse=True)
    # filter spectogram to reduce noise
    spectogram_filter1 = np.minimum(dbSpectogram1, librosa.decompose.nn_filter(dbSpectogram1, rec=rec1, aggregate=np.average, metric='cosine'))

    # process audio 2
    b, a = signal.butter(10, [f_low, f_high], btype='bandpass', fs=rate2)
    filt_audio2 = signal.lfilter(b, a, audio2)
    # Convert to decibel spectogram
    spectogram2 = np.abs(librosa.stft(filt_audio2))
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
    tolerance_threshold = 4

    estimated_iou = calculate_iou_with_tolerance(onset1, onset2, tolerance_threshold)

    # SCORE FACTOR TWO: FREQUENCY SCORE
    # sub-factor one --------- mel-frequency cepstral coefficients -----------

    mfcc1 = get_mfcc(audio1, rate1)
    mfcc2 = get_mfcc(audio2, rate2)

    cosine_distance = 1 - distance.cosine(mfcc1.flatten(), mfcc2.flatten())
    mfcc_score = cosine_distance

    # TEST ON BLANK FILE.... NOISES.... ETC

    # --------- RESULTS -----------

    rhythm_score = (pearson_correlation + estimated_iou) / 2
    intonation_score = mfcc_score
    combined_score = (rhythm_score + intonation_score) / 2

    return rhythm_score, intonation_score, combined_score