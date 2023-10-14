import "../styles/App.css";
import TaskSection from "../components/Tasks";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TaskManager from "../components/TaskAddForm";
import TaskAddForm from "../components/TaskAddForm";
import TaskRemoveForm from "../components/TaskRemoveForm";

function Home() {
  const { isLoading, isAuthenticated } = useAuth0();
  const { user, getIdTokenClaims } = useAuth0();
  const user_id = user?.sub;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchClaims = async () => {
      const claims = await getIdTokenClaims();
      const roles = claims["https://learnitalianpronunciation.com/roles"];
      setIsAdmin(roles && roles.includes("admin"));
    };

    fetchClaims();
  }, [getIdTokenClaims]);

  console.log(isAdmin);

  if (isLoading) {
    return (
      <div className="page-layout">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="home">
      {isAdmin && (
        <>
          <H2>Admin Tools</H2>
          <TaskAddForm />
          <TaskRemoveForm />
        </>
      )}
      <TaskSection />
    </div>
  );
}

export default Home;
