import React from "react";
import { useState, useRef } from "react";
import { PropTypes } from "prop-types";

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

MicIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  style: PropTypes.object,
};

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

const mimeType = "audio/webm";

const IconEnum = {
  Mic: "Mic",
  Stop: "Stop",
};

function RecordButton({ handleClick, icon, disabled }) {
  return (
    <div
      className={`${disabled ? "bg-grey-dark" : "bg-primary"} rounded-circle ${
        disabled ? "" : "recordBtn"
      }`}
      style={{ width: "150px", height: "150" }}
    >
      <div onClick={handleClick}>
        {icon == IconEnum.Mic ? (
          <MicIcon
            fill="white"
            width={100}
            height={100}
            style={{ margin: "25px" }}
          />
        ) : (
          <StopIcon
            fill="white"
            width={100}
            height={100}
            style={{ margin: "25px" }}
          />
        )}
      </div>
    </div>
  );
}

const AudioRecorder = ({ onAudioChange, isRecording, setIsRecording }) => {
  const mediaRecorder = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordingCounter, setRecordingCounter] = useState(0);

  const getMicrophonePermission = async () => {
    return new Promise(async (resolve, reject) => {
      if ("MediaRecorder" in window) {
        try {
          const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          });
          resolve(streamData);
        } catch (err) {
          reject(err);
        }
      } else {
        reject("The MediaRecorder API is not supported in your browser.");
      }
    });
  };

  const startRecording = async () => {
    try {
      const stream = await getMicrophonePermission();

      if (recordingCounter < 3) {
        setRecordingCounter(recordingCounter + 1);
        setIsRecording(true);

        //create Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //start recording
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
      }
    } catch (err) {
      alert(err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      onAudioChange(audioUrl, audioBlob);
      setAudioChunks([]);
    };
  };

  return (
    <div>
      <div className="audio-controls">
        {isRecording == false ? (
          <RecordButton
            handleClick={startRecording}
            icon={IconEnum.Mic}
            disabled={recordingCounter >= 3}
          />
        ) : null}
        {isRecording == true ? (
          <RecordButton handleClick={stopRecording} icon={IconEnum.Stop} />
        ) : null}
      </div>
    </div>
  );
};
export default AudioRecorder;
