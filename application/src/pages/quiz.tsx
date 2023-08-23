import React, { useState } from "react";
import "../styles/App.css";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AudioRecorder from "../components/Recorder";

type Question = {
  description: string;
  audio: string;
};

function QuestionView({ q }: { q: Question }) {
  const { description, audio } = q;

  const [recordedAudio, setRecordedAudio] = useState<Array<string>>([]);

  const handleAudioChange = (newAudio) => {
    setRecordedAudio([...recordedAudio, newAudio]);
  };

  return (
    <Stack gap={4}>
      <div>{description}</div>
      <audio
        controls
        controlsList="nodownload noplaybackrate"
        src="/its-me-mario.mp3"
      ></audio>
      <div className="fs-5">Record your answer</div>
      <Container>
        <Row>
          <Col>
            <Stack gap={5}>
              <div>
                You can only record your attempt a maximum of three times. After
                that select your best try.
              </div>
              {/* <Record /> */}
              <AudioRecorder
                onAudioChange={(audio) => handleAudioChange(audio)}
              />
            </Stack>
          </Col>
          <Col>
            <Stack gap={3}>
              {recordedAudio.length != 0
                ? recordedAudio.map((audio, index) => (
                    <div key={index}>
                      <audio
                        src={audio}
                        controls
                        controlsList="nodownload noplaybackrate"
                      ></audio>
                    </div>
                  ))
                : null}
            </Stack>
          </Col>
          <Col></Col>
        </Row>
      </Container>
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
