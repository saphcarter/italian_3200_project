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

## 1.1 Test Specification
Students submit a self evaluation score. (Part of $25)
- A user can manually enter in an integer value within the range of 1 - 100 (functionality)
- The scoring system can handle incorrect values (non integer and out of range exceptions) (functionality)
- The users find the scoring system intuitive and useful for reflection on their pronounciation (Usability)

Students receive a similarity score. (Part of $25)
- 

### Methods Tested:

-

### Conditions Of The Test:


## Test Description

_The Test Description is used as a guide in performing the test. It lists the input data and input commands for each test, as well as expected out put and system messages. If you find that you are unable to describe expected output numerically, use a natural language description. A test description consists of
Location of test (hyperlink to test)
Means of Control: Describes how data are entered (manually or automatically with a test driver)
Data
Input Data
Input Commands
Output Data
System Messages
Procedures: The test procedure is often specificed in form of a test script._</br>

### Means of Control:

Data is entered automatically with test script.

### Data

- Input Data: User is prompted for an Integer value (`Range 0 - 100`). Example: `105`, `70`.
- Output Data: error, success
- System Message: `integer out of range`, `successfully committed to database`

### Procedure:

# Test 1.2



## Test Specification

_The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test._</br>

### Requirements being tested:

-

### Conditions of the test:

## Test Description

### Means of Control:

Data is entered automatically with test script.

### Data

- Input Data: User is prompted for an Integer value (`Range 0 - 100`). Example: `105`, `70`.
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

Student recording can be played back/re-recorded by the student.($10)

## Test Specification

## Test Description

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
