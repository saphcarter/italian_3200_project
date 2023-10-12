import "./styles/App.css";
import { useState } from "react";
import { useEffect } from "react";
import NavbarComponent from "./components/Navbar";
import TaskSection from "./components/Tasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import QuizAttemptView from "./components/QuizAttempt";
import Results from "./pages/results";
//import RegistrationForm from './components/RegistrationForm';
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { ProfilePage } from "./pages/profile";
import ResultsView from "./components/QuizResults";
import Quiz from "./pages/quiz";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }
  // the basic logic of our application
  return (
    <Router>
      <div className="App container-xl">
        <NavbarComponent />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
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
            {/* testing route remove at end */}
            {/* <Route
              path="/quizEnd"
              element={<AuthenticationGuard component={ResultsView} />}
            /> */}
            {/* for quiz database */}
            {/* <Route
              path="/quiz/:id"
              element={<AuthenticationGuard component={QuizAttemptView} />}
            /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
