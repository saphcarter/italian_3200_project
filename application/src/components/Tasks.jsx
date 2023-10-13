import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://uqkijiayajogyreusvdh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxa2lqaWF5YWpvZ3lyZXVzdmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxNzM4MzksImV4cCI6MjAxMjc0OTgzOX0.vUxc_bauot2pMBcGz18fyTR_e88nGJ6jkkqV6mcBLHs"
);

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
function TaskSection() {
  const [quizzes, setQuizzes] = useState([]);

  // useEffect(() => {
  //   getQuizzes();
  // }, []);

  // async function getQuizzes() {
  //   const { data } = await supabase.from("quizzes").select();
  //   setQuizzes(data);
  // }

  useEffect(() => {
    fetch("/quizzes")
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error("Error fetching quizzes:", error));
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
        <h2 className="section-header">Your Tasks</h2>
        <div className="task-card-section">
          {quizzes.map((quiz) => (
            <TaskCard
              key={quiz[0]}
              taskName={quiz[1]}
              dueDate={formatDateTime(quiz[2])}
              quizId={quiz[0]}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default TaskSection;
