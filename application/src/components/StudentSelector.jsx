import React, { useState, useEffect } from "react";
import ScoreSection from './Results';

function StudentList({ users }) {
    return (
        <div>
            {users.map(user => (
                <StudentCard key={user.user_id} full_name={user.name} student_number={user.nickname} />
            ))}
        </div>
    );
}

function ScorePopup({ onClose, student_full_name }) {
    return (
        <div className="score-popup">
            <button className="close-button" onClick={onClose}>Close</button>
            <ScoreSection name={student_full_name} />
        </div>
    );
}

function StudentCard({full_name, student_number}) {
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
                <ScorePopup onClose={closePopup} student_full_name={full_name} />
            )}
        </>
    );
  }

  function StudentSelector() {
    const [searchTerm, setSearchTerm] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // replace YOUR_AUTH0_DOMAIN and YOUR_ACCESS_TOKEN for our app specific values
                const response = await fetch('https://YOUR_AUTH0_DOMAIN/api/v2/users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setAllUsers(data);
                setDisplayedUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filteredUsers = allUsers.filter(user => user.nickname.includes(searchTerm));
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
                    style={{ marginRight: '8px' }}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by student number..."
                />
            </form>

            <p style={{ marginTop: "16px" }}>Click on a student's name to see their results.</p>

            <div style={{ marginTop: "16px" }} className="score-card-section">
                <StudentList users={displayedUsers} />
            </div>
        </div>
    );
}


export default StudentSelector;