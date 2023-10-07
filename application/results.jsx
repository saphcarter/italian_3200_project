<<<<<<<< HEAD:application/src/results.jsx
import "./styles/App.css";
import ScoreSection from "./components/Results";
========
import "../styles/App.css";
import ScoreSection from "./src/components/Results";
>>>>>>>> c4e9ebe (move pages out of /src):application/results.jsx

function Results() {
  return (
    <div className="results">
      <ScoreSection name="self" />
    </div>
  );
}

export default Results;
