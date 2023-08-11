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

# Test 1.1

Students submit a self evaluation score. (Part of $25)

## Test Specification

_The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test._</br>

### Methods Tested:

-

### Conditions Of The Test:

- Quality
- Functionality
- Usability (How intuitive is the design): Is the scoring system easy to understand?
  The test will be performed under regular application run time conditions.

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

Students receive a similarity score. (Part of $25)

## Test Specification

_The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test._</br>

### Requirements being tested:

-

### Conditions of the test:

- Quality
- Functionality
- Usability (How intuitive is the design): Is the scoring system easy to understand?
  The test will be performed under regular application run time conditions.

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
- A test user can play and record audio without outside help.

### 2.2 Conditions of testing

- Conduct test in a quiet room.
- Ensure hardware used in testing is known to function adequately.
- Test user must not be someone who developed the platform.

### 2.3 Test Descriptions

#### 2.3.1 Test A - Play audio, manual test

Procedure:

1. Navigate to a test question screen and ensure volume is turned up.
2. Activate component that plays test audio.

Expected output: the audio file will play and sound can be heard from the device

#### 2.3.2 Test B - Record audio, manual test

Procedure:

1. Navigate to a question screen and ensure volume is turned up.
2. Activate component that allows audio recording.
3. Play back audio recording to verify sound was captured

Expected output: audio that was recorded will be heard

#### 2.3.3 Test C - Repeat Test A and B on different operating systems, manual test

Procedure:

1. Have two computers ready for testing that have different operating systems. For example; Windows and MacOS.
2. Repeat Test A on both computers.
3. Repeat Test B on both computers.

Expected output: see Test A and Test B.

#### 2.3.4 Test D - Audio tracks produce enough decibels, manual test

Procedure:

1. To establish an appropriate decibel level begin by turning up the computer volume.
2. Using a device that is not your computer, measure the computers decibel output when playing a phrase from google text to speech.
3. Write down the avg decibels measured during step 2.
4. Without adjusting your volume or your measuring device (and take care not to adjust these until the test is complete), repeat steps 2 and 3 two more times.
5. Find the average of the values written down in step 3 and 4.
6. Now play an audio track from the platform and measure the avg decibels.

Expected output: the average decibels in step 6 should be no less than 80% of the average decibels calculated in step 5.

#### 2.3.5 Test E - Intuitiveness, manual test

Procedure:

1. Navigate to a question screen.
2. Have a user (who is not from the development team) play and record an audio without any prompts from outside the application.

Expected output: user is able to play and record audio tracks without any help.

# Test 2.2

Students submit a speaking attempt (Part of $25).

## Test Specification

### Methods Tested:

- Audio is recorded accurately and in sufficient quality.
- Background interference should be minimized.

### Conditions of testing

- Quality (Are the audio samples of a high enough quality)
- Functionality (Is the software usable using different microphones: Mobile, Laptop, Desktop)

## Test Description

Clients/End user will use the recording functionality of the application

### Means of Control:

Everything is done manually.

### Data

- Input Data: User input: Clicks on play button.
- Output Data: Audio file played through system speakers.
- System Message: None.

# Test 3

Student recording can be played back/re-recorded by the student.($10)

## Test Specification

## Test Description

# Test 4

Students can view their past attempts and scores ($10)

## Test Specification

### Methods Tested:

- Scores are stored correctly in database.
- Scores are able to be accessed easily.
- Scores are displayed clearly by date/test.

### Conditions of testing

- Functionality: Scores are able to accessed and are correct
- Usability: Students are able to easily access old scores and get a sense of improvement.

## Test Description

### Means of Control:

Automatic test to see if the expected score matches the recieved score.

### Data

- Input Data: User input: Clicks on play button.
- Output Data: Audio file played through system speakers.
- System Message: None.
