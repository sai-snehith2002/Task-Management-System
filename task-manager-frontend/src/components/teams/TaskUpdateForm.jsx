import React, { useState, useEffect } from 'react';
import URL from '../../api';
import './TaskUpdateForm.scss';

export default function TaskUpdateForm({teamTaskData}) {
    const [taskData, setTaskData] = useState({
        taskTeam : teamTaskData.team,
        taskName : teamTaskData.taskName,
        taskDescription : teamTaskData.taskDescription,
        taskStatus : teamTaskData.taskStatus,
        taskImportance : teamTaskData.taskImportance,
        taskId : teamTaskData.id,
        teamId : teamTaskData.team_id
    });

    


    const hasToken = localStorage.getItem('token')
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/teams/task/${taskData.taskId}/update/`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${hasToken}`,
                },
                body : JSON.stringify({'team' : taskData.teamId, 'status' : taskData.taskStatus}),
            })
            setTaskData((prevData) => ({
                ...prevData,
                taskStatus: 'COMPLETE' // Set the task status directly to 'COMPLETE'
            }));
            if (response.ok) {
                console.log('Task Updated');
                alert("Task Updated");
            }
            else {
                console.error('Task Updation Failed')
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    return (
        <>
            <div>
                <h2>Task for {taskData.taskTeam}</h2>
                <h3>{taskData.taskDescription}</h3>
                <span>{taskData.taskImportance}</span>
                <input style={{color : "red"}} name='taskStatus' value={taskData.taskStatus} onChange={handleInputChange}/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
}
