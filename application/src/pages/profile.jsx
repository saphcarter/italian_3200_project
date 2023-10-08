import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <div>
      {/* <h2>Profile</h2> */}
      <div>
        <div className="profile-grid">
          <img
            src={user.picture}
            alt="Profile picture"
            className="profile-avatar"
          />
          <div>
            <h3>Name: {user.nickname}</h3>
            <div>Email: {user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
