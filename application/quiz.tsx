import React from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<<< HEAD:application/src/quiz.tsx
import QuizIntroScreen from "./components/QuizIntroduction";
import QuizAttemptView from "./components/QuizAttempt";
import ResultsView from "./components/QuizResults";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
========
import QuizIntroScreen from "./src/components/QuizIntroduction";
import QuizAttemptView from "./src/components/QuizAttempt";
import ResultsView from "./src/components/QuizResults";
import { AuthenticationGuard } from "./src/components/AuthenticationGuard";
>>>>>>>> c4e9ebe (move pages out of /src):application/quiz.tsx

export default function Quiz() {
  return (
    <Routes>
      <Route
        path="/intro/:name"
        element={<AuthenticationGuard component={QuizIntroScreen} />}
      />
      <Route
        path={`/attempt/:name`}
        element={<AuthenticationGuard component={QuizAttemptView} />}
      />
      <Route
        path={`/result/:name`}
        element={<AuthenticationGuard component={ResultsView} />}
      ></Route>
    </Routes>
  );
}
