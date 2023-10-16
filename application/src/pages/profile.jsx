import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>
        <div className="profile-grid">
          <div>
            <h3>
              Name: {user.user_metadata ? user.user_metadata.name : user.name}
            </h3>
            <div>Student Number: {user.nickname}</div>
            <div>Email: {user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
