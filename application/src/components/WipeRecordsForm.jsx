import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";

function WipeRecordsForm({isAdmin}) {
  const [showPopup, setShowPopup] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const { user, getIdTokenClaims } = useAuth0();
  const user_id = user?.sub;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const deleteRecords = async () => {
    try {
      const response = await fetch("/api/wiperecords", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin }),
      });

      if (response.ok) {
        console.log("Successfully deleted records!");
      } else {
        console.error("Server responded with an error.");
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      console.error("Error occurred while deleting records:", error);
    }
  };

  const deleteUsers = async () => {
    try {
      const response = await fetch("/api/wipeusers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          isAdmin,
        }),
      });

      if (response.ok) {
        console.log("Successfully deleted users!");
      } else {
        console.error("Server responded with an error.");
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      console.error("Error occurred while deleting users:", error);
    }
  };

  const confirmDeletion = () => {
    if (confirmationText === "delete") {
        deleteRecords()
        .then(() => deleteUsers())
        .then(() => {
            setShowSuccessPopup(true);
            setShowPopup(false);
        })
        .catch(error => {
            console.error("Error during deletion:", error);
        });
    } else {
        console.log("Incorrect confirmation text.");
    }
};

  return (
    <div className="my-2">
      {!showPopup ? (
        <button className="btn btn-danger" onClick={() => setShowPopup(true)}>
          Delete Records
        </button>
      ) : (
        <div>
          <button className="btn btn-dark" onClick={() => setShowPopup(false)}>
            Cancel Record Deletion &times;
          </button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>
              Are you sure you want to delete all records &#40;including tests, questions, and results&#41;, and all users except
              yourself? Type <strong>delete</strong> to confirm.
            </p>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
            />
          </div> 
          <div>
            <button
              className="btn btn-danger"
              style={{ marginRight: "16px", marginTop: "16px" }}
              onClick={confirmDeletion}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="tick-icon">
            &#10004; Records & users removed successfully. Please refresh the page.
          </div>
        </div>
      )}
    </div>
  );
}

export default WipeRecordsForm;
