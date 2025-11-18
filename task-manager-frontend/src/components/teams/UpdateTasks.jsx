import React, { useState, useEffect } from 'react';
import URL from '../../api';
import TaskUpdateForm from './TaskUpdateForm';

export default function UpdateTasks() {
    const [teamTasks, setTeamTasks] = useState([]);
    const hasToken = localStorage.getItem('token');
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${URL}/api/teams/get-tasks/`, {
                    method : 'GET',
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${hasToken}`
                    }
                })
                if (response.ok){
                    const data = await response.json();
                    setTeamTasks(data.task);
                }
                else{
                    console.error('Error fetching task')
                }
            } catch (err){
                throw new Error(err)
            }
        }
        fetchTasks();
        console.log(teamTasks)
    }, [hasToken]);

    return (
    <>
        <h2>All tasks</h2>
        {teamTasks.map((task, index) => (
            <TaskUpdateForm key={index} teamTaskData={task} />
        ))}
    </>
    );
}
