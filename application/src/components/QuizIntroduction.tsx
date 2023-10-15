import React from "react";
import { Link, useParams } from "react-router-dom";
import { MicIcon, StopIcon } from "./AudioRecorder";

export default function QuizIntroScreen() {
  const { id, name } = useParams();

  // possibly remove and make as separate component?
  // const MicIcon = (props) =>
  //   React.createElement(
  //     "svg",
  //     {
  //       xmlns: "http://www.w3.org/2000/svg",
  //       width: props.width || "16",
  //       height: props.height || "16",
  //       fill: props.fill || "currentColor",
  //       style: props.style,
  //       viewBox: "0 0 16 16",
  //     },
  //     React.createElement("path", {
  //       d: "M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z",
  //     }),
  //     React.createElement("path", {
  //       d: "M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z",
  //     })
  //   );

  // // possibly remove and make as separate component?
  // const StopIcon = (props) =>
  //   React.createElement(
  //     "svg",
  //     {
  //       xmlns: "http://www.w3.org/2000/svg",
  //       width: props.width || "16",
  //       height: props.height || "16",
  //       fill: props.fill || "currentColor",
  //       style: props.style,
  //       viewBox: "0 0 16 16",
  //     },
  //     React.createElement("path", {
  //       d: "M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z",
  //     })
  //   );

  return (
    <div className="p-4">
      <h2>{name}</h2>
      <hr className="border-2"></hr>
      <p>
        You are about to begin this italian pronounciation quiz! Your attempt
        will not start until you click the 'Start Quiz' button.
      </p>
      <p>
        Every quiz has a set of questions with two parts. Please read on to
        learn how to navigate the quiz and for explanations of the two scores
        you will receive.
      </p>
      <h5 style={{ paddingTop: "25px" }}>Part 1: Similarity score</h5>
      <p>
        In this part you will listen to an audio sample of an Italian phrase or
        sentence. After, you will record yourself repeating the audio, doing
        your best to match the pronounciation.
      </p>
      <div className="d-flex align-items-center gap-4 my-4 ">
        <div
          style={{ flexBasis: "50%" }}
          className="d-flex align-items-center w-50 gap-4"
        >
          <div
            className="bg-primary rounded-circle"
            style={{ height: "150px", width: "150px" }}
          >
            <MicIcon
              fill="white"
              width={100}
              height={100}
              style={{ margin: "25px" }}
            />
          </div>
          <p>
            In the quiz, click this button to start recording your speaking
            attempt. If it's your first time, you may have to approve the
            browser microphone permissions, recording will begin once you have
            clicked accept.
          </p>
        </div>
        <div className="d-flex align-items-center w-50 gap-4">
          <div
            className="bg-primary rounded-circle"
            style={{ height: "150px", width: "150px" }}
          >
            <StopIcon
              fill="white"
              width={100}
              height={100}
              style={{ margin: "25px" }}
            />
          </div>
          <p>
            During recording the button will look like this, click to end your
            recording. You will have three attempts to record before this button
            will disappear.
          </p>
        </div>
      </div>
      <p>
        You can record a maximum of 3 attempts, although you may be happy with
        your first recording. Once you have recorded an audio you may play them
        back. Check the box of your chosen answer and click submit which will
        take you to the second part of the question.
      </p>
      <p>
        Once submitted our audio similarity algorithm will generate a score that
        rates how similar your audio was to the sample. You will be able to see
        this score at the end of the quiz on the results page or by viewing
        previously completed quizzes in the results tab.
      </p>
      <h5 style={{ paddingTop: "25px" }}>Part 2: Self-evaluation score</h5>
      <p>
        In this part you will score yourself based on how well you think you did
        using a slider, this is your self-evaluation score. The default is set
        to 70%, but you should change this to what you think best reflects your
        attempt. This score does not affect your similarity score and is used as
        a metric to build confidence in your speaking ability.
      </p>
      <p style={{ paddingTop: "25px" }}>
        The intention of this application is to help you practice and improve
        your italian speaking and pronounciation, so don't stress, just relax,
        and have fun!
      </p>
      <div className="d-flex justify-content-end my-4">
        <Link to={`/quiz/attempt/${id}/${name}`}>
          <button className="btn btn-primary">Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}
