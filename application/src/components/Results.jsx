import React, { useState, useEffect } from "react";

// individual results card, will show results for a specific quiz
function QuizCard({quizResultId, taskName, dateCompleted }) {
  const [questionResults, setQuestionResults] = useState([]);

  useEffect(() => {
    fetch(`/question_results/questions/${quizResultId}`)
      .then(response => response.json())
      .then(data => setQuestionResults(data))
      .catch(error => console.error('Error fetching question results:', error));
  }, [quizResultId]);
  
  return (
    <>
      <div className="score-card">
        <div>
          <h4 className = "cardtitle">{taskName}</h4>
          <p className = "cardtitle"> Completed: {dateCompleted}</p>
        </div>
        {questionResults.map(qResult => (
          <QuestionCard 
            key={qResult[0]}
            questionNumber={qResult[2] + 1}
            SelfScore={qResult[4]}
            GivenScore={qResult[3]}
          />
        ))}
      </div>
    </>
  );
}

// individual result for each question from a quiz
function QuestionCard({questionNumber, SelfScore, GivenScore }) {
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
function ScoreSection({name, user_id}) {

  console.log(user_id);

  const [quizResults, setQuizResults] = useState([]);
  const sectionTitle = name === 'self' ? "Your Results" : `${name}'s Results`;

  function formatDateTime(isoDate) {
    const date = new Date(isoDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    fetch('/quiz_results/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id })
    })
    .then(response => response.json())
    .then(data => setQuizResults(data))
    .catch(error => console.error('Error fetching quiz results:', error));
  }, [user_id]);

  console.log(quizResults);

  return (
    <>
      <div className="section">
        <h2 className="section-header">{sectionTitle}</h2>
        <div className="score-card-section">
          {quizResults.map(result => (
            <QuizCard
              key={result[0]}
              quizResultId={result[0]}
              taskName= "Quiz XYZ"
              dateCompleted={formatDateTime(result[3])}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ScoreSection;
