import librosa
import audiosegment
import numpy as np
import sox

# note: sox not directly used but needed for filter_silence()... just a reminder for now

# (BOTH METHODS) filler name/path of audio files
question_file = "question.m4a"
answer_file = "answer.m4a"

# (BOTH METHODS) read in audio files using audiosegment (from pydub)
question = audiosegment.from_file(question_file)
answer = audiosegment.from_file(answer_file)

print("Loaded Files Done...")

# ----------------- METHOD 1 -------------------------

# filter silence from answers (just testing, is it necessary???) ...
# OR... other processing here maybe
f_question = question.filter_silence()
f_answer = answer.filter_silence()

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
cross_similarity_matrix = librosa.segment.cross_similarity(answer_arr, question_arr)

# TODO: ANALYSE THE MATRIX TO GIVE A SCORE SOMEHOW
# MAYBE librosa.sequence.rqa????

# calculate alignment score matrix
alignment_matrix = librosa.sequence.rqa(cross_similarity_matrix)
# ^^^ i think this might be good but still have to process the result a bit more i think
# possibly get the value in the bottom right corner (ie column.length-1 & row.length-1)????
# then compare to values based on testing

# ------------------------------------------

print("Process Files Done...")

# then process (either similarity matrix or spectrogram???) to give a similarity score somehow
# FILLER FOR NOW!
similarity_score = 100

print("Similarity Score: " + str(similarity_score))