import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader, { VariableHeightLoader } from "./Loader";

// individual task entry point, will take you to quiz page
function TaskCard({ taskName, dueDate, quizId }) {
  return (
    <Link to={`quiz/intro/${quizId}/${taskName}`} className="task-card">
      <div className="task-card-name">{taskName}</div>
      <div className="task-card-date">Due date: {dueDate}</div>
    </Link>
  );
}

// container for all available task entry points
function TaskSection({ isAdmin }) {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quizzes")
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setIsLoading(false);
      });
  }, []);

  function formatDateTime(isoDate) {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JS
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  }

  return (
    <>
      <div className="section">
        <h2 className="section-header">
          {isAdmin ? "All Quizzes" : "Your Quizzes"}
        </h2>
        <div className="task-card-section">
          {isLoading ? (
            <VariableHeightLoader height="50px" />
          ) : (
            quizzes.map((quiz) => (
              <TaskCard
                key={quiz[0]}
                taskName={quiz[1]}
                dueDate={formatDateTime(quiz[2])}
                quizId={quiz[0]}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default TaskSection;
