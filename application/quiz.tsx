import React from "react";
import { Routes, Route } from "react-router-dom";
import QuizIntroScreen from "./src/components/QuizIntroduction";
import QuizAttemptView from "./src/components/QuizAttempt";
import ResultsView from "./src/components/QuizResults";
import { AuthenticationGuard } from "./src/components/AuthenticationGuard";

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
