import React, { useState } from "react";
import "../styles/App.css";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AudioRecorder from "../components/AudioRecorder";
import Button from "react-bootstrap/esm/Button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type Question = {
  description: string;
  audio: string;
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
      <div className="mt-4 fs-5">Self-evaluation score</div>
      <Stack gap={4}>
        <div>
          Give a score between 0 and 100% rating how similar you think your
          submission is to the original audio.
        </div>
        <Container className="mt-4 mx-0 d-flex align-items-start gap-5 px-0 flex-wrap container-fluid">
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
              <div>Self Evaluation Score</div>
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

function QuestionView({ q }: { q: Question }) {
  const { description, audio } = q;

  const [recordedAudio, setRecordedAudio] = useState<Array<string>>([]);

  const handleAudioChange = (newAudio) => {
    setRecordedAudio([...recordedAudio, newAudio]);
  };

  const [selected, setSelected] = useState(0);

  const [isRecordingView, setIsRecordingView] = useState(true);

  function submitAudio() {
    //fake save
    setIsRecordingView(false);
  }

  function saveSelfEvalScore(value: number) {}

  return (
    <Stack gap={4}>
      <div>{description}</div>
      <audio
        controls
        controlsList="nodownload noplaybackrate"
        src="/its-me-mario.mp3"
      ></audio>
      {isRecordingView ? (
        <>
          <div className="fs-5">Record your answer</div>
          <Container>
            <Row>
              <Col>
                <Stack gap={5}>
                  <div>
                    You can only record your attempt a maximum of three times.
                    After that select your best try.
                  </div>
                  {/* <Record /> */}
                  <AudioRecorder
                    onAudioChange={(audio) => handleAudioChange(audio)}
                  />
                </Stack>
              </Col>
              <Col>
                <Stack gap={4}>
                  {recordedAudio.length != 0
                    ? recordedAudio.map((audio, index) => (
                        <div className="d-flex align-items-center" key={index}>
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
                    variant="outline-success"
                    type="button"
                    onClick={submitAudio}
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
          submitScore={saveSelfEvalScore}
        />
      )}
    </Stack>
  );
}

function Quiz() {
  const questions: Question[] = [
    {
      description:
        "Instructions lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam vel nulla ut luctus. Vivamus a auctor est. Quisque efficitur. lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam vel nulla ut luctus. Vivamus a auctor est. Quisque efficitur. ",
      audio: "somefile",
    },
    { description: "this is second question", audio: "somefile" },
  ];

  const questionNumber = 0;

  return (
    <div className="p-4">
      <div className="fs-2 fw-medium"> Quiz Name </div>
      <hr className="border-2"></hr>
      <Stack gap={3} className="mx-3">
        <div className="fs-4">Question {questionNumber + 1}</div>
        <QuestionView q={questions[questionNumber]} />
      </Stack>
    </div>
  );
}

export default Quiz;
