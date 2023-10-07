import "./src/styles/App.css";
import { useState } from "react";
import { useEffect } from "react";
import NavbarComponent from "./components/Navbar";
import TaskSection from "./components/Tasks";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import QuizAttemptView from "./components/QuizAttempt";
import Results from "./results";
//import RegistrationForm from './components/RegistrationForm';
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { ProfilePage } from "./profile";
import ResultsView from "./components/QuizResults";
import Quiz from "./quiz";
import TaskManager from "./taskmanager";
import ResultsManager from "./resultsmanager";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavbarComponent />}>
      <Route index element={<Home />} />
      <Route
        path="/quiz/*"
        element={<AuthenticationGuard component={Quiz} />}
      />
      <Route
        path="/results"
        element={<AuthenticationGuard component={Results} />}
      />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route
        path="/taskmanager"
        element={<AuthenticationGuard component={TaskManager} />}
      />
      <Route
        path="/resultsmanager"
        element={<AuthenticationGuard component={ResultsManager} />}
      />
      {/* testing route remove at end
    <Route
      path="/quizEnd"
      element={<AuthenticationGuard component={ResultsView} />}
    />
    for quiz database
    <Route
      path="/quiz/:id"
      element={<AuthenticationGuard component={QuizAttemptView} />}
    /> */}
    </Route>
  )
);

function App({ routes }) {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }
  // the basic logic of our application
  return <RouterProvider router={router} />;
}

export default App;
