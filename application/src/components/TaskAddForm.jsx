import React, { useState } from 'react';

const TaskAddForm = () => {
    const [dueDateTime, setDueDateTime] = useState('');
    const [warning, setWarning] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [numOfQuestions, setNumOfQuestions] = useState(1);
    const [questions, setQuestions] = useState(Array.from({ length: numOfQuestions }, () => ({ questionFile: '' })));


    const OpenPopup = () => {
        setIsPopupOpen(true);
    };

    const ClosePopup = () => {
        setWarning('');
        setIsPopupOpen(false);
    };

    const Submit = async (e) => {
        e.preventDefault();

        if (warning) {
            alert('Please select a future date and time.');
            return;
        }

        const taskName = document.getElementById('taskName').value;
        const quizResponse = await fetch('/quizzes/addquiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: taskName,
                due_date: dueDateTime,
            }),
        });
    
        if (quizResponse.ok) {
            const responseData = await quizResponse.json();

            for (let i = 0; i < numOfQuestions; i++) {
                const questionFile = questions[i].questionFile;
                const formData = new FormData();
                formData.append('questionFile', questionFile);

                for (const entry of formData.entries()) {
                    console.log(entry);
                }
    
                const uploadResponse = await fetch('/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (uploadResponse.ok) {
                    const audioPath = await uploadResponse.json();

                    const questionResponse = await fetch('/questions/addquestion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quiz_id: responseData.id,
                            audio: audioPath,
                        }),
                    });
        
                    if (!questionResponse.ok) {
                        alert('Error adding question');
                        return;
                    }
                    
                }
                else {
                    alert('Error uploading audio file');
                    return;
                }
            }

            setIsPopupOpen(false);
            setShowSuccessPopup(true);
    
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000);
        } else {
            alert('Error adding quiz');
        }

    };

    const handleNumOfQuestionsChange = (e) => {
        const newNumOfQuestions = parseInt(e.target.value, 10);

        setNumOfQuestions(newNumOfQuestions);

        setQuestions(Array.from({ length: newNumOfQuestions }, () => ({ questionFile: '' })));
    };

    const QuestionChange = (index, e) => {
        const file = e.target.files[0];
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionFile = file;
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

        // using ISO8601 format
        const isoDate = selectedDateTime.toISOString();

        console.log("ISODATE: " + isoDate)
        setDueDateTime(isoDate);
    };

    return (
        <div className="section">
            <h2>Task Creator</h2>

            {!isPopupOpen && (
                <button onClick={OpenPopup}>Click Here to Add New Task </button>
            )}

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="form-group close" onClick={ClosePopup}>
                            Cancel Task &times;
                        </button>

                        <form onSubmit={Submit} encType="multipart/form-data" method="post">
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
                                        required
                                    />
                                    {warning && <div className="warning">{warning}</div>}
                            </div>

                            <div className="form-group">
                                <label style={{ marginRight: '8px' }} htmlFor="numOfQuestions">Number of Questions: </label>
                                <select
                                    id="numOfQuestions"
                                    value={numOfQuestions}
                                    onChange={handleNumOfQuestionsChange}
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