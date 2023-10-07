import "../styles/App.css";
import TaskSection from "./src/components/Tasks";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./src/components/LoginButton";
import TaskAddForm from "./src/components/TaskAddForm";
import TaskRemoveForm from "./src/components/TaskRemoveForm";

function ResultsManager() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <Loader />
      </div>
    );
  }

  return <div className="resultsmanager">{isAuthenticated ? <></> : null}</div>;
}

export default ResultsManager;
