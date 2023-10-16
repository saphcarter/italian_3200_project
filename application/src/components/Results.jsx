import React, { useState, useEffect } from "react";
import Loader, { VariableHeightLoader } from "./Loader";

// individual results card, will show results for a specific quiz
function QuizCard({ quizResultId, taskName, dateCompleted }) {
  const [questionResults, setQuestionResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/getquestionresults?qrid=${quizResultId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("received questionresults:", data);
        setQuestionResults(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching question results:", error);
        setIsLoading(false);
      });
  }, [quizResultId]);

  return (
    <>
      <div className="score-card">
        <div>
          <h4 className="cardtitle">{taskName}</h4>
          <p className="cardtitle"> Completed: {dateCompleted}</p>
        </div>
        {isLoading ? (
          <div className="loader-div" style={{ margin: "16px" }}>
            {" "}
            <VariableHeightLoader height="50px" />{" "}
          </div>
        ) : (
          questionResults.map((qResult) => (
            <QuestionCard
              key={qResult.id}
              questionNumber={qResult.questionNumber + 1}
              SelfScore={qResult.selfEvalScore}
              GivenScore={qResult.similarityScore}
            />
          ))
        )}
      </div>
    </>
  );
}

// individual result for each question from a quiz
function QuestionCard({ questionNumber, SelfScore, GivenScore }) {
  return (
    <>
      <div className="score-justified">
        <p className="score-text">Question {questionNumber}</p>
        <p className="score-text">Self Evaluation Score: {SelfScore}</p>
        <p className="score-text">Similarity Score: {GivenScore}</p>
      </div>
    </>
  );
}

// container for all available result cards
function ScoreSection({ name, user_id }) {
  const [quizResults, setQuizResults] = useState([]);
  const sectionTitle = name === "self" ? "Your Results" : `${name}'s Results`;
  const [isLoading, setIsLoading] = useState(true);

  console.log(`results for ${user_id}`);

  function formatDateTime(isoDate) {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JS
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    fetch(`/api/getquizresults`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizResults(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz results:", error);
        setIsLoading(false);
      });
  }, [user_id]);

  console.log(quizResults);

  return (
    <>
      <div className="section">
        <h2 className="section-header">{sectionTitle}</h2>
        <div className="score-card-section">
          {isLoading ? (
            <div className="loader-div" style={{ margin: "16px" }}>
              {" "}
              <VariableHeightLoader height="50px" />{" "}
            </div>
          ) : (
            quizResults.map((result) => (
              <QuizCard
                key={result.id}
                quizResultId={result.id}
                taskName={result.quizName}
                dateCompleted={formatDateTime(result.dateCompleted)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ScoreSection;
