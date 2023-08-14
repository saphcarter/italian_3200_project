# _PROJECT ACCEPTANCE TESTING_

## Objectives

_Forecast the testing strategy, the unit tests, integation test and system tests listed in this document._ </br>
This document will detail the project acceptance testing procedure to be used to access the highest priority features of this project. After having the client complete a $100 test on the proposed features of the product, a prioritized list of features was constructed. Of that list, the features that comprised the top $70 of value were selected:</br>
Students listen to an Italian audio snippet and submit a speaking attempt

- Students submit a self-evaluation score and receive a similarity score
- Student recording can be played back/re-recorded by the student.
- Students can view their past attempts and scores
- Acceptance tests were then constructed for these requirements.

## Document References

_In this section, reference the major documents produced during project development. Explains the relationships among the requirements documents, design documents, implementation documents and the test procedures._

## Test Summary

_In this section, describe the functions of the system tested in this document (Refer to Requirements Analysis Document and Problem Statement)_</br>

## Testing Strategy

_In this section, define the subsystem or subsystems to be tested, the system integration strategy and how, where, when, and by whom the tests will be conducted. You may want to include drawings depicting relationships among the major classes of the subsystem or the subsystem decomposition, if you feel this is appropriate._

# Test 1
We will be examining how the implemented scoring system meets the specified requirements. This has been broken down into two parts; the user provided self evaluation score and the API generated similarity score. These two requirements combined form a value of $25 in the $100 test that was performed with the client. We will be considering these following factors:
- Quality: Is the quality of the socring system to the standard of the client.
- Functionality: Does it function as specified by the requirements.
- Usability (How intuitive is the design): Is the scoring system easy to understand?

The test will be performed under regular application run time conditions.

### 1.1 Test Specification
Students submit a self evaluation score. (Part of $25)
- A user can manually enter in an integer value within the range of 1 - 100 (functionality)
- The scoring system can handle incorrect values (non integer and out of range exceptions) (functionality)
- The users find the scoring system intuitive and useful for reflection on their pronounciation (Usability)</br>
Students receive a similarity score. (Part of $25)
- 

### Methods Tested:

-

### 1.2 Conditions Of The Testing:
Data is entered automatically with test script.
- Needs to have functionality for audio recording.
- 

### 1.3 Test Descriptions

#### 1.3.1 Test Correct Input for Self Evaluation
Procedure:
1. User is directed to provide a score that is an integer between 1 to 100.

Expected Input Data: User is prompted for an Integer value (`Range 0 - 100`). Example: `70`.
Expected Output Data: Success
Expected System Message: `successfully committed to database`

#### 1.3.2 Test Incorrect Input for Self Evaluation
Procedure:
1. User is directed to provide a score that is less than 1.
2. User is then directed to enter a non integer value.

Expected Input Data: User is prompted for an Integer value (`Range 0 - 100`). Example:`-1`, `105`.
Expected Output Data: Error
Expected System Message: `integer out of range`, `non integer value`

#### 1.3.3 Gather usability data for self evaluation.

#### 1.3.4 Test Generated Score with speaking audio file.

#### 1.3.5 Test Generated Score with Client provided speaking file.


### Data

-
- Output Data: error, success
- System Message: `integer out of range`, `successfully committed to database`


# Test 2

We will examine the audio elements of the platform, including playing question's audio tracks and recording audio in response. This is related to the requirement 'Students listen to an Italian audio snippet and submit a speaking attempt' valued at $25 by the client in the $100 test. We will be considering three factors for success:

- Quality: does it function well?
- Functionality: does it function in different environments?
- Usability: is it easy to use?

### 2.1 Test Specification

- A user can play an audio track (functionality).
- A user can record their own audio (functionality).
- Audio playing and recording functions work on both windows and macOS (functionality).
- Audio tracks are decipherable and above a certain decibel threshold (quality).
- A user can play and record audio without outside help (usability).

### 2.2 Conditions of testing

- Conduct test in a quiet room.
- Ensure hardware used in testing is known to function adequately.
- Usability tester must not be someone who developed the platform.

### 2.3 Test Descriptions

#### 2.3.1 Test A - Play audio

Procedure:

1. Navigate to a quiz question screen and ensure volume is turned up.
2. Activate component that plays the question audio.

Expected output: the audio file will play and sound can be heard from the device

#### 2.3.2 Test B - Record audio

Procedure:

1. Navigate to a question screen and ensure volume is turned up.
2. Activate component that allows audio recording.
3. Play back audio recording to verify sound was captured

Expected output: audio that was recorded will be heard

#### 2.3.3 Test C - Repeat Test A and B on different operating systems

Procedure:

1. Have two computers ready for testing that have different operating systems. For example; Windows and MacOS.
2. Repeat Test A on both computers.
3. Repeat Test B on both computers.

Expected output: see Test A and Test B expected outputs.

#### 2.3.4 Test D - Audio tracks produce enough decibels

Procedure:

1. To establish an appropriate decibel level begin by turning up the computer volume.
2. Using a device that is not your computer, measure the computers decibel output when playing a phrase from google text to speech.
3. Write down the avg decibels measured during step 2.
4. Without adjusting your volume or your measuring device (and take care not to adjust these until the test is complete), repeat steps 2 and 3 twice more.
5. Find the average of the values written down in step 3 and 4.
6. Now play an audio track from one of the quiz questions, measuring and recording the avg decibels.
7. Repeat step 6 twice more and calculate the avg decibels of the audio tracks.

Expected output: the average decibels in step 7 should be no less than 80% of the average decibels calculated in step 5.

#### 2.3.5 Test E - Intuitiveness

Procedure:

1. Navigate to a question screen.
2. Have a user (who is not from the development team) play and record an audio without any prompts from outside the application.

Expected output: user is able to play and record audio tracks without any help.

# Test 3
We will examine how audio recorded by the user is able to be played back and re-recorded. The client has specififed that they would like students to be given 3 attempts at recording audio for quizes. This is related to the 'Student recording can be played back/re-recorded by the student' which was valued at $10 by the client. The following considerations will be made to determine succesful completion of the tests:

- Functionality: Students are able to record/re-record audio and play it back.
- Usability: The recording functionality is easy to use.

### 3.1 Test Specification
- A user is able to record/re-record audio files for each word up to 3 times (functionality).
- A user is able to play back recorded audio (functionality).
- A user can record audio for up to 5 seconds (functionality).
- The user is given a delay in order to prepare for recording (Usability).

### 3.2 Conditions of testing
- User must be basically familiar with the recording functionality of the application.
### 3.3 Test Descriptions
#### 3.3.1 User is provided 3 attempts to record
Procedure:
1. User is asked to record an audio file.
2. User is asked to re-record an audio file.
3. User is asked to re-record a final time.

Expected Output Data: Success
Expected System Message: `Out of recording attempts`

#### 3.3.2 User is able to immediately play back audio
Procedure:
1. User is asked to record an audio file.
2. User is asked to playback the audio file.
3. User is asked to re-record the audio file.
4. User is asked to playback the audio file.

Expected Output Data: The first recorded file should be stored for playback. This file should be replaced by the second recording once it is complete.
#### 3.3.3 The time frame for recording is enough for users.
Procedure:
1. The user is provided 4 short words in Italian.
2. The user is asked to record their pronounciation of the word.
3. The user is provided 4 long words in Italian.
4. The user is asked to record their pronounciation of the word.
5. The user is then provided a short questionairre on how they felt the recording time impacted their attempts.

Expected Input data: Data would be recorded as ordinal data (Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree)
Example Questions:
1. The time limit made me felt pressured to answer quickly.
2. The time limit felt suitable for pronounciation of short words.
3. The time limit felt suitable for pronounciation of long words.
4. I would prefer a 10 second time limit.
5. The time limit should be shorter.

This data would help to influence further decisions on provided time limits for recordings.
#### 3.3.4 The provided delay is helpful in preparing the user for recording
Procedure:
1. The user is asked to complete a quiz.
2. The user is provided with a questionairre related to the delay.

Expected Input data: Data would be recorded as ordinal data (Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree)
Example Questions:
1. The delay helped me to feel more prepared.
2. The delay should be shorter.
3. The delay should be longer.
4. I would prefer no delay.

This data would help to influence further decisions on how a delay should be included, if at all.
# Test 4

We will examine user access to their quiz data. This is related to the requirement 'Students can view their past attempts and scores' valued at $10 by the client in the $100 test. We will be considering two factors for success:

- Functionality: Does it work?
- Usability: Is the design easy to intuit and is the data understandable?

### 4.1 Test Specification

- A user can see their correctly reported past scores for each question in a quiz as well as their overall score (functionality).
- A user can understand the presentation of their data and easily navigate to the attempt and scores they want to see (usability).

### 4.2 Conditions of testing

- Usability tester must not be someone who developed the platform.
- Platform must be signed into an account with previously completed test attempts.

### 4.3 Test Descriptions

#### 4.3.1 Test A - Viewing scores

Procedure:

1. Navigate to a quiz, complete the quiz noting the reported similarity score and the self-evaluation score you select (do not worry about the accuracy of your answers).
2. Navigate to the previous attempts view.
3. Select the quiz that was just attempted and click through individual scores.

Expected output: platform will display individual question scores, the overall scores and they match what was noted in step 1.

#### 4.3.2 Test B - Intuitiveness

Procedure:

1. Log into an account with previous quiz attempts.
2. Navigate to the home screen.
3. Have a user (who is not from the development team) find the previous attempts and view the scores.

Expected output: user is able to find previous attemps, and can correctly identify the individual question scores and overall scores.
