import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// individual task entry point, will take you to quiz page
function TaskCard({ taskName, dueDate }) {
  return (
    <Link to={`quiz/intro/${taskName}`} className="task-card">
      <div className="task-card-name">{taskName}</div>
      <div className="task-card-date">Due date: {dueDate}</div>
    </Link>
  );
}

// container for all available task entry points
function TaskSection() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("/quizzes")
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(error => console.error("Error fetching quizzes:", error));
  }, []);
  
  return (
    <>
      <div className="section">
        <h2 className="section-header">Your Tasks</h2>
        <div className="task-card-section">
          {quizzes.map(quiz => (
            <TaskCard key={quiz[0]} taskName={quiz[1]} dueDate={quiz[2]} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TaskSection;
