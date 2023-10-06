import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import getAllQuizzes from "../hooks/getAllQuizzes";

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
    getAllQuizzes()
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, []);

  console.log(quizzes);
  return (
    <>
      <div className="section">
        <h2 className="section-header">Your Tasks</h2>
        <div className="task-card-section">
          {quizzes.map((quiz) => {
            <TaskCard taskName={quiz.name} dueDate={quiz.dueDate} />;
          })}
          <TaskCard taskName="Week 1 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 2 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 3 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 4 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 5 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 6 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 7 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 8 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 9 Quiz" dueDate="dueDate" />
          <TaskCard taskName="Week 10 Quiz" dueDate="dueDate" />
        </div>
      </div>
    </>
  );
}

export default TaskSection;
