import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function AdminPanel() {
  const { isAuthenticated, user } = useAuth0();

  // Check if the user is authenticated and has the "Administrator" role
  const isAdmin =
    isAuthenticated &&
    user &&
    user["https://your-auth0-namespace/roles"].includes("Administrator");

  return (
    <div>
      {isAdmin && (
        <div>
          {/* e.g. just need to connect to functions */}
          <button>Delete Quiz</button> 
          <button>Create Quiz</button>
          {/* functions here */}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
