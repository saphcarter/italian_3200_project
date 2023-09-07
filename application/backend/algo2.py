import librosa
import audiosegment
import numpy as np
import sox
import matplotlib.pyplot as plt
from pydub import AudioSegment
from scipy.io.wavfile import read

from pydub.playback import play

# had to brew install sox and ffmpeg

# references to file names
answerWav = "./answer.wav"
answerM4A = "./answer.m4a"

def graph(path):
    # fig, ax = plt.subplots(nrows=3, ncols=1, sharex=['row'])
    fig, ax = plt.subplots(3,1)

    #conversion
    data, sampleRate = getDataAndRateFromFile(path)
    data = convertIntNPToFloatNP(data)
    librosa.display.waveshow(data, sr=sampleRate, ax=ax[0])
    ax[0].set(title='conversion')
    ax[0].label_outer()

    #librosa load
    data, sampleRate = librosa.load(path, mono=False)
    librosa.display.waveshow(data, sr=sampleRate, ax=ax[1])
    ax[1].set(title='no loss')
    ax[1].label_outer()

    data, sampleRate = librosa.load(answerM4A, mono=False)
    librosa.display.waveshow(data, sr=sampleRate, ax=ax[2])
    ax[2].set(title='m4a')
    ax[2].label_outer()

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
        # return AudioSegment.from_file(path)
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

def main():

    # load answer files
    # m4a = convertFileToAudioSegment(answerM4A)
    # wav = convertFileToAudioSegment(answerWav)

    # trim files
    m4a = makeTrimmedAudioSegment(answerM4A)
    wav = makeTrimmedAudioSegment(answerWav)

    audio1 = {'title': "m4a file", 'segment': m4a}
    audio2 = {'title': "wav file", 'segment': wav}

    playAudios([audio1, audio2])
    # graph(answerWav)


if __name__ == "__main__":
    main()