import librosa
import audiosegment
import numpy as np
import sox
import sys
from scipy.io.wavfile import write

def convertIntNPToFloatNP(data):
    scaled_data = data.astype(np.float32)  # Convert to 32-bit floating-point
    # Reverse the scaling and normalization
    scaled_data /= 32767.0  # Divide by the maximum 16-bit integer value
    return scaled_data

def convertFloatNPtoIntNP(data):
    return np.int16(data / np.max(np.abs(data)) * 32767)

def writeToFile(signal, rate, path):
    write(path, rate, signal)

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

def main(path):
    split = path.split(".")
    noExt = "".join(split[0:-1])
    wavPath = f'{noExt}-trim.wav'

    signal, rate = trimFile(path)
    signal = convertFloatNPtoIntNP(signal)
    
    writeToFile(signal, rate, wavPath)
    
    return wavPath


if __name__ == "__main__":
    main(str(sys.argv[1]))