# *PROJECT ACCEPTANCE TESTING*
## Objectives
*Forecast the testing strategy, the unit tests, integation test and system tests listed in this document.* </br>
This document will detail the project acceptance testing procedure to be used to access the highest priority features of this project. After having the client complete a $100 test on the proposed features of the product, a prioritized list of features was constructed. Of that list, the features that comprised the top $70 of value were selected:</br>
Students listen to an Italian audio snippet and submit a speaking attempt
- Students submit a self-evaluation score and receive a similarity score
- Student recording can be played back/re-recorded by the student.
- Students can view their past attempts and scores
- Acceptance tests were then constructed for these requirements.
## Document References
*In this section, reference the major documents produced during project development. Explains the relationships among the requirements documents, design documents, implementation documents and the test procedures.*

## Test Summary
*In this section, describe the functions of the system tested in this document (Refer to Requirements Analysis Document and Problem Statement)*</br>

## Testing Strategy
*In this section, define the subsystem or subsystems to be tested, the system integration strategy and how, where, when, and by whom the tests will be conducted. You may want to include drawings depicting relationships among the major classes of the subsystem or the subsystem decomposition, if you feel this is appropriate.*

# Test 1.1
Students submit a self evaluation score. (Part of $25)
## Test Specification
*The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test.*</br>
### Methods Tested:
- 
### Conditions Of The Test:
- Quality
- Functionality
- Usability (How intuitive is the design): Is the scoring system easy to understand?
The test will be performed under regular application run time conditions.
## Test Description
*The Test Description is used as a guide in performing the test. It lists the input data and input commands for each test, as well as expected out put and system messages. If you find that you are unable to describe expected output numerically, use a natural language description. A test description consists of
Location of test (hyperlink to test)
Means of Control: Describes how data are entered (manually or automatically with a test driver)
Data
Input Data
Input Commands
Output Data
System Messages
Procedures: The test procedure is often specificed in form of a test script.*</br>

### Means of Control: 
Data is entered automatically with test script.
### Data
- Input Data: User is prompted for an Integer value (`Range 0 - 100`). Example:  `105`, `70`.
- Output Data: error, success
- System Message: `integer out of range`, `successfully committed to database`
### Procedure:


# Test 1.2
Students receive a similarity score. (Part of $25)
## Test Specification
*The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test.*</br>
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
- Input Data: User is prompted for an Integer value (`Range 0 - 100`). Example:  `105`, `70`.
- Output Data: error, success
- System Message: `integer out of range`, `successfully committed to database`

# Test 2.1
Students listen to an Italian audio snippet (Part of $25).
## Test Specification
### Methods Tested:
- Audio is played at a quality that it is considered audible.
- Audio is played at a suitable volume (Decibel range that is accessible)
### Conditions of testing
- Quality (Are the audio samples of a high enough quality)
- Functionality (Is it playable on different microphones: Mobile, Laptop, Desktop)
- Usability (Take into consideration those with difficulty hearing)
## Test Description
### Means of Control:
Everything is done manually.
### Data
- Input Data: User input: Clicks on play button.
- Output Data: Audio file played through system speakers.
- System Message: None.
### Procedure:


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

