import React, { useState } from "react";

const TaskAddForm = () => {
  const [dueDateTime, setDueDateTime] = useState("");
  const [warning, setWarning] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [questions, setQuestions] = useState(
    Array.from({ length: numOfQuestions }, () => ({ questionFile: "" }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const OpenPopup = () => {
    setIsPopupOpen(true);
  };

  const ClosePopup = () => {
    setWarning("");
    setIsPopupOpen(false);
  };

  const Submit = async (e) => {
    e.preventDefault();

    if (warning) {
      alert("Please select a future date and time.");
      setIsSubmitting(false);
      return;
    }

    const taskName = document.getElementById("taskName").value;
    const quizResponse = await fetch("/api/addquiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskName,
        due_date: dueDateTime,
      }),
    });

    if (quizResponse.ok) {
      const responseData = await quizResponse.json();

      for (let i = 0; i < numOfQuestions; i++) {
        const questionFile = questions[i].questionFile;

        const uploadResponse = await fetch(
          `/api/upload?filename=${questionFile.name}`,
          {
            method: "POST",
            body: questionFile,
            headers: {
              "Content-Type": questionFile.type,
            },
          }
        );

        const blobInfo = await uploadResponse.json();
        if (uploadResponse.ok) {
          console.log("Blob URL:", blobInfo.url);
        } else {
          console.error("Error uploading file:", blobInfo.error);
        }

        if (uploadResponse.ok) {
          const audioPath = questionFile.name;

          const questionResponse = await fetch("/api/addquestion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quizId: responseData.id,
              audio: audioPath,
              blob_url: blobInfo.url,
            }),
          });

          if (!questionResponse.ok) {
            alert("Error adding question");
            setIsSubmitting(false);
            return;
          }

          const questionInfo = await questionResponse.json();
          console.log(questionInfo);
        } else {
          alert("Error uploading audio file");
          setIsSubmitting(false);
          return;
        }
      }

      setIsPopupOpen(false);
      setIsSubmitting(false);
      setShowSuccessPopup(true);
    } else {
      setIsSubmitting(false);
      alert("Error adding quiz");
    }
  };

  const handleNumOfQuestionsChange = (e) => {
    const newNumOfQuestions = parseInt(e.target.value, 10);

    setNumOfQuestions(newNumOfQuestions);

    setQuestions(
      Array.from({ length: newNumOfQuestions }, () => ({ questionFile: "" }))
    );
  };

  const QuestionChange = (index, e) => {
    const file = e.target.files[0];
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionFile = file;
    setQuestions(updatedQuestions);
  };

  const handleDateChange = (e) => {
    const selectedDateTime = new Date(e.target.value);
    const currentDateTime = new Date();

    if (selectedDateTime < currentDateTime) {
      setWarning(
        "Warning: This date and time has already passed. Please select a date and time in the future."
      );
    } else {
      setWarning("");
    }

    // using ISO8601 format
    const isoDate = selectedDateTime.toISOString();

    setDueDateTime(isoDate);
  };

  return (
    <div className="my-2">
      {!isPopupOpen && (
        <button className="btn btn-primary" onClick={OpenPopup}>
          Add New Quiz
        </button>
      )}

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button
              className="btn btn-dark form-group close"
              onClick={ClosePopup}
            >
              Cancel Add Quiz &times;
            </button>

            <form
              onSubmit={(event) => {
                if (!isSubmitting) {
                  setIsSubmitting(true);
                  Submit(event);
                }
              }}
              encType="multipart/form-data"
              method="post"
            >
              <div className="form-group">
                <label style={{ marginRight: "8px" }} htmlFor="taskName">
                  Task Name:{" "}
                </label>
                <input
                  type="text"
                  id="taskName"
                  placeholder="e.g. Week 1 Quiz"
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ marginRight: "8px" }} htmlFor="dueDateTime">
                  Due Date and Time:
                </label>
                <input
                  type="datetime-local"
                  id="dueDateTime"
                  name="dueDateTime"
                  onChange={handleDateChange}
                  required
                />
                {warning && <div className="warning">{warning}</div>}
              </div>

              <div className="form-group">
                <label style={{ marginRight: "8px" }} htmlFor="numOfQuestions">
                  Number of Questions:{" "}
                </label>
                <select
                  id="numOfQuestions"
                  value={numOfQuestions}
                  onChange={handleNumOfQuestionsChange}
                  required
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              {Array.from({ length: numOfQuestions }).map((_, index) => (
                <div className="form-group" key={index}>
                  <label style={{ marginRight: "8px" }}>
                    Question {index + 1}:
                  </label>
                  <input
                    type="file"
                    name="questionFile"
                    accept="audio/*"
                    onChange={(e) => QuestionChange(index, e)}
                    required
                  />
                </div>
              ))}

              <button className="btn btn-primary form-group" type="submit">
                Add New Quiz
              </button>
            </form>
          </div>
        </div>
      )}
      {isSubmitting && (
        <div className="loading-popup">
          <div className="loading-icon">&#xe027; Quiz is submitting...</div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="tick-icon">
            &#10004; Quiz added successfully. Please refresh the page.
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAddForm;
