import "../styles/App.css";
import ScoreSection from "../components/Results";
import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function Results() {
  const { user, getIdTokenClaims } = useAuth0();
  const user_id = user?.sub;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchClaims = async () => {
      const claims = await getIdTokenClaims();
      const roles = claims['https://localhost:5173/roles'];
      setIsAdmin(roles && roles.includes('admin'));
    };
    
    fetchClaims();
  }, [getIdTokenClaims]);
  
  return (
    <div className="results">
      {isAdmin ? <StudentSelector /> : <ScoreSection name="self" user_id={user_id} />}
    </div>
  );
}

export default Results;
