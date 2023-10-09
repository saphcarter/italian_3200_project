import React, { useState } from 'react';
import ScoreSection from './Results';

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // search logic here, e.g., make an API call
        console.log('Search term:', searchTerm);
    };

    return (
        <div className="section">
            <form  onSubmit={handleSearchSubmit}>
                <input 
                    style= {{ marginRight: '8px' }}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for a student..."
                />
                <button type="submit">Search</button>
            </form>

            <p style= {{marginTop: "16px"}}>Click on a student's name to see their results.</p>

            <div style = {{ marginTop : "16px" }} className = "score-card-section">
                <StudentCard full_name="Jane Doe" student_number = "123" />
                <StudentCard full_name="John Doe" student_number = "456" />
            </div>
        </div>
    );
}

export default StudentSelector;