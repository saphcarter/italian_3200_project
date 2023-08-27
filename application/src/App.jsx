import "./styles/App.css";
import { useState } from "react";
import { useEffect } from "react";
import NavbarComponent from "./components/Navbar";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  }, []);

  return (
    <div className="App">
      <NavbarComponent />
      <header className="App-header">
        <h1>Testing</h1>
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;
