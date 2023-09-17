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
from skimage.metrics import structural_similarity as ssim
from numpy import dot
from numpy.linalg import norm

# had to brew install sox and ffmpeg
# for skiage do python -m pip install -U scikit-image

# references to file names
answerWav = "./answer.wav"
answerM4A = "./answer.m4a"

staticWav = "./static.wav"
staticm4a = "./static.m4a"

def graph(paths):
    # fig, ax = plt.subplots(nrows=3, ncols=1, sharex=['row'])
    fig, ax = plt.subplots(len(paths),1)

    for index, path in enumerate(paths):
      librosa.display.waveshow(path['data'], sr=path['rate'], ax=ax[index])
      ax[index].set(title=path['title'])
      ax[index].label_outer()

    # D = librosa.amplitude_to_db(np.abs(librosa.stft(data)), ref=np.max)
    # img = librosa.display.specshow(D, y_axis='linear', x_axis='time', sr=sampleRate, ax=ax[0])
    # ax[0].set(title='Linear-frequency power spectrogram')
    # ax[0].label_outer()

    # hop_length = 1024
    # D = librosa.amplitude_to_db(np.abs(librosa.stft(data, hop_length=hop_length)), ref=np.max)
    # librosa.display.specshow(D, y_axis='log', sr=sampleRate, hop_length=hop_length, x_axis='time', ax=ax[1])
    # ax[1].set(title='Log-frequency power spectrogram')
    # ax[1].label_outer()
    # fig.colorbar(img, ax=ax, format="%+2.f dB")

    plt.show()

def playAudios(audios):
    for audio in audios:
        print(audio['title'])
        play(audio['segment'])

def getDataAndRateFromFile(path):
    rate, signal = read(path)
    return signal, rate

def convertIntNPToFloatNP(data):
    scaled_data = data.astype(np.float32)  # Convert to 32-bit floating-point
    # Reverse the scaling and normalization
    scaled_data /= 32767.0  # Divide by the maximum 16-bit integer value
    return scaled_data

def convertFloatNPtoIntNP(data):
    return np.int16(data / np.max(np.abs(data)) * 32767)

def convertFileToAudioSegment(path):
    ext = path.split(".")
    if ext[-1] == "m4a":
        data, rate = librosa.load(path, mono=False, duration=10)
        scaled = np.int16(data / np.max(np.abs(data)) * 32767)
        return AudioSegment(
            scaled.tobytes(),
            frame_rate=rate,
            sample_width=scaled.dtype.itemsize,
            channels=1
        )
    else :
        rate, signal = read(path)
        return AudioSegment(
            signal.tobytes(),
            frame_rate=rate,
            sample_width=signal.dtype.itemsize,
            channels=1
        )
    
def makeAudioSegment(rate, signal):
    return AudioSegment(
            signal.tobytes(),
            frame_rate=rate,
            sample_width=signal.dtype.itemsize,
            channels=1
        )

def makeTrimmedAudioSegment(path):
    ext = path.split(".")
    if ext[-1] == "m4a":
        data, rate = librosa.load(path, mono=False, duration=10)
        scaled = np.int16(data / np.max(np.abs(data)) * 32767)
        signaltrim, index = librosa.effects.trim(scaled, top_db=20)
    else :
        rate, signal = read(path)
        signaltrim, index = librosa.effects.trim(signal, top_db=20)
    return makeAudioSegment(rate, signaltrim)

def graphSpectograms(path1, path2):
    audio1, sr1 = librosa.load(path1)
    audio2, sr2 = librosa.load(path2)

    # Create spectrograms
    spec1 = librosa.feature.melspectrogram(y=audio1, sr=sr1)
    spec2 = librosa.feature.melspectrogram(y=audio2, sr=sr2)

    # Convert to dB scale (optional but recommended)
    spec1_db = librosa.power_to_db(spec1, ref=np.max)
    spec2_db = librosa.power_to_db(spec2, ref=np.max)

    # Plot both spectrograms
    plt.figure(figsize=(12, 6))

    # Plot spec1_db
    plt.subplot(2, 1, 1)
    librosa.display.specshow(spec1_db, sr=sr1, x_axis='time', y_axis='mel')
    plt.colorbar(format='%+2.0f dB')
    plt.title('Spectrogram of Audio 1')

    # Plot spec2_db
    plt.subplot(2, 1, 2)
    librosa.display.specshow(spec2_db, sr=sr2, x_axis='time', y_axis='mel')
    plt.colorbar(format='%+2.0f dB')
    plt.title('Spectrogram of Audio 2')

    plt.tight_layout()
    plt.show()

def trimFile(path):
    ext = path.split(".")
    if ext[-1] == "m4a":
        data, rate = librosa.load(path, mono=False, duration=10)
        signaltrim, index = librosa.effects.trim(data, top_db=20)
        return signaltrim, rate
    else :
        # rate, signal = read(path)
        data, rate = librosa.load(path, mono=False, duration=10)
        signaltrim, index = librosa.effects.trim(data, top_db=20)
        return signaltrim, rate
    
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

    # --------- SIMILARITY SCORING -----------

    flat_d1 = dbSpectogram1.flatten()
    flat_d2 = dbSpectogram2.flatten()

    correlation = np.corrcoef(flat_d1, flat_d2)[0, 1]

    # --------- RESULTS -----------

    print(f"Pearson Correlation Coefficient: {correlation}")

    similar = np.subtract(spectogram_filter1, spectogram_filter2)
    similar = np.sum(similar)
    print(f'differences {similar}')

    # graph([{'title': 'normal', 'data': audio1, 'rate': rate1}, {'title': 'filtered', 'data': filt_audio1, 'rate': rate1}])

    onset1 = librosa.onset.onset_detect(y=filt_audio1, sr=rate1)
    onset2 = librosa.onset.onset_detect(y=filt_audio2, sr=rate2)

    print("onset1: ", ", ".join(map(str, onset1)), "onset2: ", ", ".join(map(str, onset2)))


def main():

    compareFiles('./answer.m4a', './static.m4a')

if __name__ == "__main__":
    main()