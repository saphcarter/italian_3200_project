import React, { useState } from "react";
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
import { Link, redirect, useParams } from "react-router-dom";
import QuizIntroScreen from "./QuizIntroduction";

type Question = {
  description: string;
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
}: {
  recordedAudio: string;
  submitScore: (number) => void;
}) {
  const [selfEvalScore, setSelfEvalScore] = useState(70);

  function handleSelfEvalChange(value: number | number[]) {
    if (typeof value == "number") {
      setSelfEvalScore(value || value[0]);
    }
  }

  function handleSubmit() {
    submitScore(selfEvalScore);
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
  const { description, audio } = q;

  const [recordedAudio, setRecordedAudio] = useState<Array<string>>([]);
  const [recordedBlobs, setRecordedBlobs] = useState<Array<Blob>>([])

  const handleAudioChange = (newAudio, blob) => {
    setRecordedAudio([...recordedAudio, newAudio]);
    setRecordedBlobs([...recordedBlobs, blob])
  };

  const [selected, setSelected] = useState(0);

  const [isRecordingView, setIsRecordingView] = useState(true);

  const [isRecording, setIsRecording] = useState(false);

  function submitAudio() {
    // set variable
    setIsRecordingView(false);
  }

  function submit(selfEval: number) {
    const formData = new FormData();
    const audioBlob = recordedBlobs[selected]
    
    formData.append('audio', audioBlob, "recorded_audio.webm");
    formData.append('question', audio);

    let sim_score;

    // Make the fetch call
    fetch('/audio', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Handle the numeric score received from the backend
      console.log('Received score:', data.score);
      sim_score = data.score;
    })
    .catch(error => {
      console.error('Error:', error);
    }); 
    
    //reset variables
    setIsRecordingView(true);
    setSelected(0);
    setRecordedAudio([]);

    const result: Result = {
      //fake score
      similarityScore: sim_score,
      selfEvaluationScore: selfEval,
    };

    submitResult(result);
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
                      onAudioChange={(audio, blob) => handleAudioChange(audio, blob)}
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
          />
        )}
      </div>
    </Stack>
  );
}

function FinalScreen() {
  const { name } = useParams();

  return (
    <div>
      <p>
        You've completed all the questions for this quiz. Press submit to finish
        the quiz and be taken to the results page.
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/quiz/result/${name}`}>
          <button className="btn btn-primary">Submit</button>
        </Link>
      </div>
    </div>
  );
}

function QuizAttemptView() {
  const { name } = useParams();

  const questions: Question[] = [
    {
      description: "placeholder description",
      audio: "/1-come-ti-chiami.m4a",
    },
    { description: "placeholder description", audio: "/2-come-stai.m4a" },
    {
      description: "placeholder description",
      audio: "/3-questo-e-Matteo.m4a",
    },
  ];

  const [questionNumber, setQuestionNumber] = useState(0);

  const [quizResults, setQuizResults] = useState<Array<QuizResult>>([]);

  function submitResult(result: Result) {
    const quizResult: QuizResult = { question: questionNumber, result: result };
    setQuizResults([...quizResults, quizResult]);
    setQuestionNumber(questionNumber + 1);
  }

  function handleQuizSubmit() {
    window.location.href = "/";
  }

  return (
    <div className="p-4">
      <h2>{name}</h2>
      <hr className="border-2"></hr>
      {questionNumber < questions.length ? (
        <>
          <Stack gap={3} className="mx-3">
            <h4>Question {questionNumber + 1}</h4>
            <QuestionView
              q={questions[questionNumber]}
              submitResult={submitResult}
            />
          </Stack>
        </>
      ) : (
        <FinalScreen />
      )}
    </div>
  );
}

export default QuizAttemptView;
