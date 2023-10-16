import "./styles/App.css";
import NavbarComponent from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Results from "./pages/results";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { ProfilePage } from "./pages/profile";
import Quiz from "./pages/quiz";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Router>
      <div className="App container-xl">
        <NavbarComponent />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
