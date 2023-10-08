import "./styles/App.css";
import NavbarComponent from "./components/Navbar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Results from "./results";
//import RegistrationForm from './components/RegistrationForm';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { ProfilePage } from "./profile";
import Quiz from "./quiz";
import TaskManager from "./taskmanager";
import ResultsManager from "./resultsmanager";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Old routes
// <Routes>
//   <Route path="/" element={<NavbarComponent />}>
//     <Route index element={<Home />} />
//     <Route path="quiz/*" element={<AuthenticationGuard component={Quiz} />} />
//     <Route
//       path="results"
//       element={<AuthenticationGuard component={Results} />}
//     />
//     <Route
//       path="profile"
//       element={<AuthenticationGuard component={ProfilePage} />}
//     />
//     <Route
//       path="/taskmanager"
//       element={<AuthenticationGuard component={TaskManager} />}
//     />
//     <Route
//       path="/resultsmanager"
//       element={<AuthenticationGuard component={ResultsManager} />}
//     />
//     {/* testing route remove at end
//   <Route
//     path="/quizEnd"
//     element={<AuthenticationGuard component={ResultsView} />}
//   />
//   for quiz database
//   <Route
//     path="/quiz/:id"
//     element={<AuthenticationGuard component={QuizAttemptView} />}
//   /> */}
//   </Route>
// </Routes>

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "quiz/*", element: <AuthenticationGuard component={Quiz} /> },
  { path: "results", element: <AuthenticationGuard component={Results} /> },
  {
    path: "profile",
    element: <AuthenticationGuard component={ProfilePage} />,
  },
  {
    path: "taskmanager",
    element: <AuthenticationGuard component={TaskManager} />,
  },
  {
    path: "resultsmanager",
    element: <AuthenticationGuard component={ResultsManager} />,
  },
]);

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }
  // the basic logic of our application
  return (
    <div>
      <NavbarComponent />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
