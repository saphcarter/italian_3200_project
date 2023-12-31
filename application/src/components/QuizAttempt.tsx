import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AudioRecorder from "./AudioRecorder";
import "rc-slider/assets/index.css";
import Button from "react-bootstrap/esm/Button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ResultsView from "./QuizResults";
import { Link, redirect, useParams, useNavigate } from "react-router-dom";
import QuizIntroScreen from "./QuizIntroduction";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";

type Question = {
  audio: string;
};

type Result = {
  similarityScore: number;
  selfEvaluationScore: number;
};

export type QuizResult = {
  question: number;
  result: Result;
};

function SelfEvaluation({
  recordedAudio,
  submitScore,
  qIsSubmitting,
  setQIsSubmitting,
}: {
  recordedAudio: string;
  submitScore: (number) => void;
  qIsSubmitting: boolean;
  setQIsSubmitting: (boolean) => void;
}) {
  const [selfEvalScore, setSelfEvalScore] = useState(70);

  function handleSelfEvalChange(value: number | number[]) {
    if (typeof value == "number") {
      setSelfEvalScore(value || value[0]);
    }
  }

  function handleSubmit() {
    if (!qIsSubmitting) {
      setQIsSubmitting(true);
      submitScore(selfEvalScore);
    }
  }

  return (
    <>
      <h4>Self-Evaluation Score</h4>
      <Stack gap={3}>
        <p style={{ maxWidth: "750px" }}>
          Rate how similar you think your attempt is to the original audio using
          the slider. 0% is not similar at all and 100% is as similar as
          possible. You can move the slider by dragging the circle or clicking
          the circle and then using the keyboard arrows.
        </p>
        <Container className="d-flex align-items-start gap-5 px-0 flex-wrap container-fluid">
          <div>
            <div className="mb-3">Your audio:</div>
            <audio
              controls
              controlsList="nodownload noplaybackrate"
              src={recordedAudio}
            ></audio>
          </div>
          <Stack gap={1} style={{ maxWidth: "400px", minWidth: "200px" }}>
            <div className="d-flex align-items-baseline justify-content-between">
              <div>Self-evaluation score:</div>
              <h1
                className="mb-0"
                style={{ fontSize: "60px", textAlign: "right" }}
              >
                {selfEvalScore}%
              </h1>
            </div>
            <Slider
              defaultValue={selfEvalScore}
              aria-label="Default"
              startPoint={0}
              min={1}
              onChange={handleSelfEvalChange}
              trackStyle={{ background: "#0A998F" }}
              handleStyle={[
                {
                  border: "solid 2px #0A998F",
                  borderRadius: "50%",
                  opacity: "1",
                },
              ]}
            />
            <Button
              variant="outline-danger"
              style={{ width: "100px" }}
              className="align-self-end mt-4"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {qIsSubmitting && (
              <div className="loading-popup" style={{ maxWidth: "400px" }}>
                <div className="loading-icon">
                  &#xF421; Please wait while your answer is submitting
                </div>
              </div>
            )}
          </Stack>
        </Container>
      </Stack>
    </>
  );
}

function QuestionView({
  q,
  submitResult,
}: {
  q: Question;
  submitResult: (result: Result) => void;
}) {
  const { audio } = q;

  const [recordedAudio, setRecordedAudio] = useState<Array<string>>([]);
  const [recordedBlobs, setRecordedBlobs] = useState<Array<Blob>>([]);

  const handleAudioChange = (newAudio, blob) => {
    setRecordedAudio([...recordedAudio, newAudio]);
    setRecordedBlobs([...recordedBlobs, blob]);
  };

  const [selected, setSelected] = useState(0);
  const [isRecordingView, setIsRecordingView] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [qIsSubmitting, setQIsSubmitting] = useState(false);

  function submitAudio() {
    // set variable
    setIsRecordingView(false);
  }

  async function submit(selfEval: number) {
    const formData = new FormData();
    const audioBlob = recordedBlobs[selected];

    formData.append("audio", audioBlob, "recorded_audio.webm");

    let sim_score;
    let submitted_url;

    // make the fetch call
    try {
      const response = await fetch("/api/audiosubmit", {
        method: "POST",
        body: formData,
      });
      const upload_data = await response.json();
      submitted_url = upload_data.url;
      console.log("External API Response:", submitted_url);
    } catch (error) {
      console.error("Error:", error);
      return;
    }

    try {
      const compare = {
        question: audio,
        answer: submitted_url,
      };

      const compareResponse = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(compare),
      });
      const compareData = await compareResponse.json();

      // Assuming compareData has a property 'similarityScore'
      sim_score = compareData.similarityScore;
      console.log("Second API Response - Similarity Score:", sim_score);
    } catch (error) {
      console.error("Error in second API call:", error);
      return;
    }

    //reset variables
    setIsRecordingView(true);
    setSelected(0);
    setRecordedAudio([]);

    const result: Result = {
      similarityScore: sim_score,
      selfEvaluationScore: selfEval,
    };

    console.log(result);

    submitResult(result);

    setQIsSubmitting(false);
  }

  return (
    <Stack gap={4}>
      <p>
        {isRecordingView
          ? "Listen to the recording below and then record yourself repeating the audio."
          : "Compare the original recording below to your speaking attempt."}
      </p>
      <audio
        controls
        controlsList="nodownload noplaybackrate"
        src={audio}
      ></audio>
      <div className="pt-4">
        {isRecordingView ? (
          <>
            <h4>Record your answer</h4>
            <Container>
              <Row>
                <Col className="ps-0">
                  <Stack gap={5}>
                    <p>
                      You can only record your attempt a maximum of three times.
                      After that select your best try.
                    </p>
                    {/* <Record /> */}
                    <AudioRecorder
                      onAudioChange={(audio, blob) =>
                        handleAudioChange(audio, blob)
                      }
                      isRecording={isRecording}
                      setIsRecording={(value: boolean) => {
                        setIsRecording(value);
                      }}
                    />
                  </Stack>
                </Col>
                <Col>
                  <Stack gap={4}>
                    {recordedAudio.length != 0
                      ? recordedAudio.map((audio, index) => (
                          <div
                            className="d-flex align-items-center"
                            key={index}
                          >
                            <div className="form-check">
                              <input
                                className={`form-check-input ${
                                  index == selected ? "bg-primary" : ""
                                }`}
                                type="checkbox"
                                checked={index == selected}
                                onChange={() => setSelected(index)}
                              />
                            </div>
                            <div>
                              <audio
                                src={audio}
                                controls
                                controlsList="nodownload noplaybackrate"
                                className={
                                  index == selected
                                    ? "border border-2 border-primary"
                                    : ""
                                }
                                style={
                                  index == selected
                                    ? { borderRadius: "30px" }
                                    : {}
                                }
                              ></audio>
                            </div>
                          </div>
                        ))
                      : null}
                  </Stack>
                </Col>
                <Col>
                  {recordedAudio.length > 0 && (
                    <Button
                      variant="outline-danger"
                      type="button"
                      onClick={submitAudio}
                      disabled={isRecording == true}
                    >
                      Submit
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <SelfEvaluation
            recordedAudio={recordedAudio[selected]}
            submitScore={submit}
            qIsSubmitting={qIsSubmitting}
            setQIsSubmitting={(it) => setQIsSubmitting(it)}
          />
        )}
      </div>
    </Stack>
  );
}

function FinalScreen({ results }) {
  const { id, name } = useParams();
  const { user } = useAuth0();
  const user_id = user?.sub;
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  let quizResultId;
  const navigate = useNavigate();
  const [quizSubmitting, setQuizSubmitting] = useState(false);

  async function handleQuizSubmit() {
    // submit the quiz result
    try {
      const response = await fetch("/api/addquizresult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user_id,
          quizId: id,
          dateCompleted: isoDate,
          quizName: name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        const errorMsg = `Failed to submit quiz results. Server error: ${errorData.error}. Data sent: userId: ${errorData.userId}, quizId: ${errorData.quizId}, dateCompleted: ${errorData.dateCompleted}, quizName: ${errorData.quizName}`;

        throw new Error(errorMsg);
      }

      const responseData = await response.json();
      quizResultId = responseData.id;

      console.log(`quizresultid: ${quizResultId}`);

      // submit each question result
      for (const q_result of results) {
        const questionResponse = await fetch("/api/addquestionresult", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizResultId: quizResultId,
            questionNumber: q_result.question,
            similarityScore: q_result.result.similarityScore,
            selfEvaluationScore: q_result.result.selfEvaluationScore,
          }),
        });

        if (!questionResponse.ok) {
          const errorData = await questionResponse.json();

          const errorMsg = `Failed to submit result for question ${q_result.question}. Server error: ${errorData.error}. Data sent: quizResultId: ${errorData.quizResultId}, questionNumber: ${errorData.questionNumber}, similarityScore: ${errorData.similarityScore}, selfEvaluationScore: ${errorData.selfEvaluationScore}`;

          console.log(errorMsg);

          throw new Error(
            `Failed to submit result for question ${q_result.question}`
          );
        }
      }
      console.log("Successfully submitted quiz and question results.");
      setQuizSubmitting(false);
      navigate(`/quiz/result/${quizResultId}/${name}`);
    } catch (error) {
      console.error("Error during quiz submission:", error);
      setQuizSubmitting(false);
    }
  }

  return (
    <div>
      <p>
        You've completed all the questions for this quiz. Press submit to finish
        the quiz and be taken to the results page.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <button
          onClick={() => {
            if (!quizSubmitting) {
              setQuizSubmitting(true);
              handleQuizSubmit();
            }
          }}
          className="btn btn-primary"
        >
          Submit
        </button>
        {quizSubmitting && (
          <div className="loading-popup">
            <div className="loading-icon">
              &#xe027; Please wait while your quiz results are submitting, this
              may take a few seconds..
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizAttemptView() {
  const { id, name } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/getquestions?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newQuestions = data.map((q) => ({ audio: q.audio }));
        setQuestions(newQuestions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const [questionNumber, setQuestionNumber] = useState(0);

  const [quizResults, setQuizResults] = useState<Array<QuizResult>>([]);

  function submitResult(result: Result) {
    setQuizResults((prevQuizResults) => {
      const newQuizResult: QuizResult = {
        question: questionNumber,
        result: result,
      };
      return [...prevQuizResults, newQuizResult];
    });
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
  }

  console.log(questions);

  return (
    <div className="p-4">
      <h2>{name}</h2>
      <hr className="border-2" />
      {isLoading ? (
        <div>
          {/* <Loader loadMessage="We're fetching your quiz, this shouldn't take long. Please don't refresh!" /> */}
          <Loader />
        </div>
      ) : questionNumber < questions.length ? (
        <>
          <Stack gap={3} className="mx-3">
            <h4>Question {questionNumber + 1}</h4>
            <QuestionView
              key={questionNumber}
              q={questions[questionNumber]}
              submitResult={submitResult}
            />
          </Stack>
        </>
      ) : (
        <FinalScreen results={quizResults} />
      )}
    </div>
  );
}

export default QuizAttemptView;
