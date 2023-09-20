import React from "react";
import { Link, useParams } from "react-router-dom";

export default function QuizIntroScreen() {
  const { name } = useParams();

  return (
    <div className="p-4">
      <h2>{name}</h2>
      <hr className="border-2"></hr>
      <div>This is the instructions page</div>
      <Link to={`/quiz/attempt/${name}`}>
        <button>Next Page</button>
      </Link>
    </div>
  );
}
