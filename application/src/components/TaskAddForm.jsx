import React, { useState } from 'react';

const TaskAddForm = () => {
    const [dueDateTime, setDueDateTime] = useState('');
    const [warning, setWarning] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [numOfQuestions, setNumOfQuestions] = useState(1);
    const [questions, setQuestions] = useState([]);

    const OpenPopup = () => {
        setIsPopupOpen(true);
    };

    const ClosePopup = () => {
        setWarning('');
        setIsPopupOpen(false);
    };

    const Submit = (e) => {
        e.preventDefault();

        if (warning) {
            alert('Please select a future date and time.');
            return;
        }

        // Process the form data (send it to our server, update state, etc.)
        // Reset the form inputs if needed

        setIsPopupOpen(false);

        setShowSuccessPopup(true);

        setTimeout(() => {
            setShowSuccessPopup(false);
        }, 3000);

    };

    const QuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index][name] = value;
        setQuestions(updatedQuestions);
    };

    const handleDateChange = (e) => {
        const selectedDateTime = new Date(e.target.value);
        const currentDateTime = new Date();
    
        if (selectedDateTime < currentDateTime) {
            setWarning('Warning: This date and time has already passed. Please select a date and time in the future.');
        } else {
            setWarning('');
        }
    
        setDueDateTime(e.target.value);
    };

    return (
        <div className="section">
            <h2>Task Creator</h2>

            {!isPopupOpen && (
                <button onClick={OpenPopup}>Add New Task </button>
            )}

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="form-group close" onClick={ClosePopup}>
                            Cancel Task &times;
                        </button>

                        <form onSubmit={Submit}>
                            <div className="form-group">
                                <label style={{ marginRight: '8px' }} htmlFor="taskName">Task Name: </label>
                                <input
                                    type="text"
                                    id="taskName"
                                    placeholder="e.g. Week 1 Quiz"
                                    required />
                            </div>

                            <div className="form-group">
                                <label style={{ marginRight: '8px' }} htmlFor="dueDateTime">Due Date and Time:</label>
                                    <input
                                        type="datetime-local"
                                        id="dueDateTime"
                                        name="dueDateTime"
                                        onChange={handleDateChange}
                                        defaultValue={`${new Date().toISOString().slice(0,10)}T23:59`}
                                        required
                                    />
                                    {warning && <div className="warning">{warning}</div>}
                            </div>

                            <div className="form-group">
                                <label style={{ marginRight: '8px' }} htmlFor="numOfQuestions">Number of Questions: </label>
                                <select
                                    id="numOfQuestions"
                                    value={numOfQuestions}
                                    onChange={(e) => setNumOfQuestions(e.target.value)}
                                    required
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>

                            {Array.from({ length: numOfQuestions }).map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label style={{ marginRight: '8px' }}>Question {index + 1}:</label>
                                    <input
                                        type="file"
                                        name="questionFile"
                                        accept="audio/*"
                                        onChange={(e) => QuestionChange(index, e)}
                                        required
                                    />
                                </div>
                            ))}

                            <button className="form-group" type="submit">Add Task</button>
                        </form>
                    </div>
                </div>
            )}

            {showSuccessPopup && (
                    <div className="success-popup">
                        <div className="tick-icon">&#10004; Task Added Successfully</div>
                    </div>
                )}
        </div>
    );
};

export default TaskAddForm;