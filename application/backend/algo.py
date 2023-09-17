import librosa
import audiosegment
import numpy as np
import sox
import matplotlib.pyplot as plt
from pydub import AudioSegment
from scipy.signal import correlate2d

# had to brew install sox and ffmpeg
# note: sox not directly used but needed for filter_silence()... just a reminder for now

# filler name/path of audio files
question_file = "question.m4a"
answer_file = "answer.m4a"

print("Loaded Files Done...")

# filter silence from answers
f_question = question.filter_silence()
f_answer = answer.filter_silence()

# no filtering
y1, sr1 = librosa.load(question_file, mono=False, duration=10)
ytrim, index = librosa.effects.trim(y1)

# with filtering
y2, sr2 = librosa.load(answer_file, mono=False, duration=10)
ytrim2, index = librosa.effects.trim(y2, top_db = 1000)

# Create an AudioSegment object from the NumPy array
audio = AudioSegment(
    ytrim2.tobytes(),  # Convert the array to bytes
    frame_rate=sr2,
    sample_width=ytrim2.dtype.itemsize,
    channels=1,  # Mono audio
)

# compute spectrogram of audio files
db_spectrogram1 = librosa.amplitude_to_db(librosa.stft(y1), ref=np.max)
db_spectrogram2 = librosa.amplitude_to_db(librosa.stft(y2), ref=np.max)

# then process (either similarity matrix or spectrogram???) to give a similarity score somehow

correlation = correlate2d(db_spectrogram1, db_spectrogram2)
similarity = np.max(correlation)

print("Process Files Done...")

print("Similarity Score: " + str(differences))