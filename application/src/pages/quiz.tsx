import React from "react";
import { Routes, Route } from "react-router-dom";
import QuizIntroScreen from "../components/QuizIntroduction";
import QuizAttemptView from "../components/QuizAttempt";
import ResultsView from "../components/QuizResults";
import { AuthenticationGuard } from "../components/AuthenticationGuard";

export default function Quiz() {
  return (
    <Routes>
      <Route
        path="/intro/:id/:name"
        element={<AuthenticationGuard component={QuizIntroScreen} />}
      />
      <Route
        path={`/attempt/:id/:name`}
        element={<AuthenticationGuard component={QuizAttemptView} />}
      />
      <Route
        path={`/result/:id/:name`}
        element={<AuthenticationGuard component={ResultsView} />}
      ></Route>
    </Routes>
  );
}
