# PROJECT ACCEPTANCE TESTING
## Objectives
*Forecast the testing strategy, the unit tests, integation test and system tests listed in this document.*
This document will detail the project acceptance testing procedure to be used to access the highest priority features of this project. After having the client complete a $100 test on the proposed features of the product, a prioritized list of features was constructed. Of that list, the features that comprised the top $70 of value were selected:
Students listen to an Italian audio snippet and submit a speaking attempt
- Students submit a self-evaluation score and receive a similarity score
- Student recording can be played back/re-recorded by the student.
- Students can view their past attempts and scores
- Acceptance tests were then constructed for these requirements.
## Document References
*In this section, reference the major documents produced during project development. Explains the relationships among the requirements documents, design documents, implementation documents and the test procedures.*
Test Summary
<<In this section, describe the functions of the system tested in this document (Refer to Requirements Analysis Document and Problem Statement)>>
Testing Strategy
In this section, define the subsystem or subsystems to be tested, the system integration strategy and how, where, when, and by whom the tests will be conducted. You may want to include drawings depicting relationships among the major classes of the subsystem or the subsystem decomposition, if you feel this is appropriate.>>

# Test A
Students submit a self evaluation score and receive a similarity score. ($25)
## Test Specification
*The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test.*
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
Procedures: The test procedure is often specificed in form of a test script.*
Take recordings of a student pronouncing the words and run the similarity algorithm to generate a score. Present our client with the recording and have them provide a score. Examine how our generated rating compares to how the client would rate them. If there are major discrepancies between these scores, the test would fail. This could be done by using a paired t-test to see if there is significant variation.

Data would be collected within the application. Ratings by the client would be collected manually by a team member and entered into a computer for statistical analysis.

### Procedure:

Test Analysis Report
Ease of use and accuracy of provided score are examined here.
<<The Test Analysis Report lists the functions and performance characteristics that were to be demonstrated, and describes the actual test results. The description of the results must include the following:
Function
Performance
Data measures, including whether target requirements have been met
If an error or deficiency has been discovered, the report discusses its impact.>>

Test B
Students listen to an Italian audio snippet and submit a speaking attempt.
Test Specification
<<The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test.>>
-Audio is recorded accurately and in sufficient quality.
-Background interference should be minimized.
Test Description
Clients/End user will use the recording functionality of the application 
<<The Test Description is used as a guide in performing the test. It lists the input data and input commands for each test, as well as expected out put and system messages. If you find that you are unable to describe expected output numerically, use a natural language description. A test description consists of
Location of test (hyperlink to test)
Means of Control: Describes how data are entered (manually or automatically with a test driver)
Data
Input Data
Input Commands
Output Data
System Messages
Procedures: The test procedure is often specificed in form of a test script.
Test Analysis Report
<<The Test Analysis Report lists the functions and performance characteristics that were to be demonstrated, and describes the actual test results. The description of the results must include the following:
Function
Performance
Data measures, including whether target requirements have been met
If an error or deficiency has been discovered, the report discusses its impact.>>

Test C
Student recording can be played back/re-recorded by the student.
Test Specification
<<The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test. >>
Test Description
<<The Test Description is used as a guide in performing the test. It lists the input data and input commands for each test, as well as expected out put and system messages. If you find that you are unable to describe expected output numerically, use a natural language description. A test description consists of
Location of test (hyperlink to test)
Means of Control: Describes how data are entered (manually or automatically with a test driver)
Data
Input Data
Input Commands
Output Data
System Messages
Procedures: The test procedure is often specificed in form of a test script.
Test Analysis Report
<<The Test Analysis Report lists the functions and performance characteristics that were to be demonstrated, and describes the actual test results. The description of the results must include the following:
Function
Performance
Data measures, including whether target requirements have been met
If an error or deficiency has been discovered, the report discusses its impact.>>


Test D
Students can view their past attempts and scores
Test Specification
<<The Test Specification lists the requirements whose satisfaction will be demonstrated by the test. It lists the methods tested, and describes the conditions of the test. >>
Test Description
<<The Test Description is used as a guide in performing the test. It lists the input data and input commands for each test, as well as expected out put and system messages. If you find that you are unable to describe expected output numerically, use a natural language description. A test description consists of
Location of test (hyperlink to test)
Means of Control: Describes how data are entered (manually or automatically with a test driver)
Data
Input Data
Input Commands
Output Data
System Messages
Procedures: The test procedure is often specificed in form of a test script.
Test Analysis Report
<<The Test Analysis Report lists the functions and performance characteristics that were to be demonstrated, and describes the actual test results. The description of the results must include the following:
Function
Performance
Data measures, including whether target requirements have been met
If an error or deficiency has been discovered, the report discusses its impact.>>
