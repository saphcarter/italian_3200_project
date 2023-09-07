import librosa
import audiosegment
import numpy as np
import sox
import matplotlib.pyplot as plt
from pydub import AudioSegment

# had to brew install sox and ffmpeg
# note: sox not directly used but needed for filter_silence()... just a reminder for now

# (BOTH METHODS) filler name/path of audio files
question_file = "question.m4a"
answer_file = "answer.m4a"
static_file = "static.m4a"

# (BOTH METHODS) read in audio files using audiosegment (from pydub)
question = audiosegment.from_file(question_file)
answer = audiosegment.from_file(answer_file)
static = audiosegment.from_file(static_file)

print("Loaded Files Done...")

# ----------------- METHOD 1 -------------------------

# filter silence from answers (just testing, is it necessary???) ...
# OR... other processing here maybe
f_question = question.filter_silence()
f_answer = answer.filter_silence()

fig, ax = plt.subplots(3, 1)

#no filtering
y, sr = librosa.load(question_file, mono=False, duration=10)
ytrim, index = librosa.effects.trim(y)
librosa.display.waveshow(ytrim, sr=sr, ax=ax[0])
ax[0].set(title='question')
ax[0].label_outer()

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

# Optional: Save the audio to a file (e.g., "output.wav")
audio.export("output.wav", format="wav")


librosa.display.waveshow(ytrim2, sr=sr2, ax=ax[2])
ax[2].set(title='answer trimed')
ax[2].label_outer()

plt.ylim(-0.5, 0.5)

librosa.display.waveshow(y, sr=sr2, ax=ax[1])
ax[1].set(title='answer no trim')
ax[1].label_outer()

plt.show()

result = y-y2

# compute spectrogram of audio files
freqs1, times1, amplitudes1 = f_question.spectrogram(window_length_s=0.03, overlap=0.5)
freqs2, times2, amplitudes2 = f_answer.spectrogram(window_length_s=0.03, overlap=0.5)

# TODO: SUBTRACT SPECTROGRAMS OR COMPARE SOMEHOW
# TODO: THEN PROCESS TO GIVE SCORE

# ----------------- METHOD 2 -------------------------

# convert to a numpy array for librosa
question_arr = question.get_array_of_samples()
question_arr = np.array(question_arr)
answer_arr = answer.get_array_of_samples()
answer_arr = np.array(answer_arr)

# compute similarity matrix of audio files
'''commented out because of time'''
# cross_similarity_matrix = librosa.segment.cross_similarity(answer_arr, question_arr)

# TODO: ANALYSE THE MATRIX TO GIVE A SCORE SOMEHOW
# MAYBE librosa.sequence.rqa????

# calculate alignment score matrix
'''commented out because of time'''
# alignment_matrix = librosa.sequence.rqa(cross_similarity_matrix)
# ^^^ i think this might be good but still have to process the result a bit more i think
# possibly get the value in the bottom right corner (ie column.length-1 & row.length-1)????
# then compare to values based on testing

# ------------------------------------------

print("Process Files Done...")

# then process (either similarity matrix or spectrogram???) to give a similarity score somehow
# FILLER FOR NOW!
similarity_score = 100

print("Similarity Score: " + str(similarity_score))