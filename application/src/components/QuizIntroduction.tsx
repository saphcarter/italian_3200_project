import React from "react";
import { Link, useParams } from "react-router-dom";

export default function QuizIntroScreen() {
  const { name } = useParams();
  
  // possibly remove and make as separate component?
  const MicIcon = (props) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: props.width || "16",
      height: props.height || "16",
      fill: props.fill || "currentColor",
      style: props.style,
      viewBox: "0 0 16 16",
    },
    React.createElement("path", {
      d: "M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z",
    }),
    React.createElement("path", {
      d: "M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z",
    })
  );

  // possibly remove and make as separate component?
  const StopIcon = (props) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: props.width || "16",
      height: props.height || "16",
      fill: props.fill || "currentColor",
      style: props.style,
      viewBox: "0 0 16 16",
    },
    React.createElement("path", {
      d: "M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z",
    })
  );

  return (
    <div className="p-4">
      <h2>{name}</h2>
      <hr className="border-2"></hr>
      <p>You are about to begin this italian pronounciation quiz!</p>
      <p>Once you begin the quiz, you will be presented with a number of different questions. Each question will contain an audio of an italian speaker speaking a phrase in italian.</p>
      <p>Your task is to listen to the audio carefully, and then do your best to repeat the phrase with proper pronounciation.</p>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div className="bg-primary rounded-circle recordBtn" style={{ height: '100px', width: '100px' }}>
        <MicIcon
              fill="white"
              width={50}
              height={50}
              style={{ margin: "25px" }}
        />
        </div>
        <p style={{ marginLeft: '10px' }}>This is the record button. In the quiz, click this button to begin your speaking attempt. Do your best to copy the original speaker's pronounciation and timing.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
        <div className="bg-primary rounded-circle recordBtn" style={{ height: '100px', width: '100px' }}>
        <StopIcon
              fill="white"
              width={50}
              height={50}
              style={{ margin: "25px" }}
        />
        </div>
        <p style={{ marginLeft: '10px' }}>This is the stop button. In the quiz, click this button to end the recording.</p>
      </div>
      <p>You will have 3 attempts to record. After this, you will have the option to listen to all of your recordings, and submit the best one.</p>
      <p>Then, you will score yourself based on how well you think you did using a slider. The default score is shown 70%, but you should change this to what you think best reflects your attempt. At the end of the quiz you will also receive a score based on an audio similarity algorithm.</p>
      <p>The intention of this application is to help you practice and improve your italian speaking and pronounciation, so don't stress, just relax, and have fun!</p>
      <Link to={`/quiz/attempt/${name}`}>
        <button>Start Quiz</button>
      </Link>
    </div>
  );
}
