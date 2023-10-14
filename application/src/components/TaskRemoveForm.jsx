import React, { useState, useEffect } from "react";

const TaskRemoveForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("/quizzes");
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const OpenPopup = () => {
    setIsPopupOpen(true);
  };

  const ClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedQuiz) {
      alert("Please select a quiz to remove.");
      return;
    }

    try {
      const response = await fetch(`/quizzes/${selectedQuiz}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await fetchQuizzes();
        console.log(`Quiz ${selectedQuiz} removed successfully`);
      } else if (response.status === 404) {
        console.error("Quiz not found");
      } else {
        console.error("Failed to remove quiz");
      }
    } catch (error) {
      console.error("Error removing quiz:", error);
    }

    setSelectedQuiz("");
    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 5000);
  };

  return (
    <div>
      {!isPopupOpen && (
        <button className="btn btn-primary" onClick={OpenPopup}>
          Remove a Quiz
        </button>
      )}

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={ClosePopup}>Cancel Remove &times;</button>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  style={{ marginRight: "8px", marginTop: "16px" }}
                  htmlFor="quizDropdown"
                >
                  Select Quiz:{" "}
                </label>
                <select
                  onClick={fetchQuizzes}
                  id="quizDropdown"
                  value={selectedQuiz}
                  onChange={handleQuizChange}
                  required
                >
                  <option value="">-- Select a Quiz --</option>
                  {quizzes.map((quiz) => (
                    <option key={quiz[0]} value={quiz[0]}>
                      {quiz[1]}
                    </option>
                  ))}
                </select>
              </div>
              <button style={{ marginTop: "16px" }} type="submit">
                Remove Selected Quiz
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="tick-icon">
            &#10004; Task removed successfully. Please refresh the page.
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskRemoveForm;
