import React, { useState, useEffect } from "react";
import ScoreSection from "./Results";
import Loader, { VariableHeightLoader } from "./Loader";

function StudentList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <StudentCard
          key={user.user_id}
          full_name={user.user_metadata ? user.user_metadata.name : user.name}
          student_number={user.nickname}
          user_id={user.user_id}
        />
      ))}
    </div>
  );
}

function ScorePopup({ onClose, student_full_name, user_id }) {
  return (
    <div className="score-popup">
      <button className="btn btn-dark" onClick={onClose}>
        Close
      </button>
      <ScoreSection name={student_full_name} user_id={user_id} />
    </div>
  );
}

function StudentCard({ full_name, student_number, user_id }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="score-justified" onClick={openPopup}>
        <h4 className="score-text">{full_name}</h4>
        <p className="score-text">Student Number: {student_number}</p>
      </div>
      {isPopupOpen && (
        <ScorePopup
          onClose={closePopup}
          student_full_name={full_name}
          user_id={user_id}
        />
      )}
    </>
  );
}

function StudentSelector() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch users from the backend route
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getusers");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setAllUsers(data);
        setDisplayedUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log(allUsers);

  useEffect(() => {
    if (searchTerm) {
      const filteredUsers = allUsers.filter((user) =>
        user.nickname.includes(searchTerm)
      );
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(allUsers);
    }
  }, [searchTerm, allUsers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="section">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          style={{ width: "20rem", marginRight: "8px" }}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by student number..."
        />
      </form>

      <p style={{ marginTop: "16px" }}>
        Click on a student's name to see their results.
      </p>

      <div style={{ marginTop: "16px" }} className="score-card-section">
        {isLoading ? (
          <div className="loader-div" style={{ margin: "16px" }}>
            {" "}
            <VariableHeightLoader height="50px" />{" "}
          </div>
        ) : (
          <StudentList users={displayedUsers} />
        )}
      </div>
    </div>
  );
}

export default StudentSelector;
