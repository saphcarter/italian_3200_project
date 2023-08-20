import Container from "react-bootstrap/Container";

function TaskCard({taskName, dueDate}) {
  return (
      <div className = "task-card">
        <h4>{taskName}</h4>
        <p>Due date: {dueDate}</p>
      </div>
  );
}

function TaskSection() {
  return (
      <>
        <div className = "task-section">
          <h2 className = "section-header">Your Tasks</h2>
          <div className = "card-section">
            <TaskCard taskName = "Week 1 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 2 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 3 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 4 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 5 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 6 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 7 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 8 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 9 Quiz" dueDate="07/03/2024"/>
            <TaskCard taskName = "Week 10 Quiz" dueDate="07/03/2024"/>
          </div>
        </div>
      </>
  );
}

export default TaskSection;