import "../styles/App.css";
import TaskSection from "./src/components/Tasks";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./src/components/LoginButton";

function Home() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <Loader />
      </div>
    );
  }

  return <div className="home">{isAuthenticated ? <TaskSection /> : null}</div>;
}

export default Home;
