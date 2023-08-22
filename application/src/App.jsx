import "./styles/App.css";
import { useState } from "react";
import { useEffect } from "react";
import NavbarComponent from "./components/Navbar";
import TaskSection from "./components/Tasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Quiz from "./quiz"

function App() {

  // the basic logic of our application
  return (
    <Router>
      <div className="App">
        
        <NavbarComponent />

        {
        // HOME SECTION START
        }

        <div className = "content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
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
