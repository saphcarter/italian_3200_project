import "../styles/App.css";
import TaskSection from "../components/Tasks";
import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { isLoading, isAuthenticated } = useAuth0();
  const { getIdTokenClaims } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchClaims = async () => {
      const claims = await getIdTokenClaims();
      const roles = claims['https://localhost:5173/roles'];
      setIsAdmin(roles && roles.includes('admin'));
    };
    
    fetchClaims();
  }, [getIdTokenClaims]);

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
      {isAdmin ? <TaskManager /> : <TaskSection />}
    </div>
  );
}

export default Home;