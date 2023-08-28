import "./styles/App.css";
import { useState } from "react";
import { useEffect } from "react";
import NavbarComponent from "./components/Navbar";
import TaskSection from "./components/Tasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Results from "./pages/results";
import Login from './components/Login';

function App() {
  // the basic logic of our application
  return (
    <Router>
      <div className="App container-xl">
        <NavbarComponent />

        {
          // HOME SECTION START
        }

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="/results" element={<Results />}></Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        {
          // HOME SECTION END - MOVE LATER
        }
      </div>
    </Router>
  );
}

export default App;
