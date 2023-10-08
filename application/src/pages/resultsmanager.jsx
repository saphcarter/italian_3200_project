import "../styles/App.css";
import TaskSection from "../components/Tasks";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/LoginButton";
import TaskAddForm from "../components/TaskAddForm";
import TaskRemoveForm from "../components/TaskRemoveForm";
import StudentSelector from "../components/StudentSelector";

function ResultsManager() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <Loader />
      </div>
    );
  }

  return (
    <div className="resultsmanager">
      {isAuthenticated ? (
        <>
          <StudentSelector />
        </>
      ) : null}
    </div>
  );
}

export default ResultsManager;
