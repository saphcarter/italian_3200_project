import { Link } from "react-router-dom";

// individual task entry point, will take you to quiz page
function TaskCard({ taskName, dueDate, link }) {
  return (
    <Link to="../quiz" className="customBtn btn-primary">
      <h4>{taskName}</h4>
      <p>Due date: {dueDate}</p>
    </Link>
  );
}

// container for all available task entry points
function TaskSection() {
  return (
    <>
      <div className="section">
        <h2 className="section-header">Your Tasks</h2>
        <div className="task-card-section">
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
