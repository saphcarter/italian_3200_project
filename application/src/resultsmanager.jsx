import "./styles/App.css";
import { useAuth0 } from "@auth0/auth0-react";

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
