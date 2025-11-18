import React, { useState, useEffect } from 'react';
import URL from '../../api'
import EachTask from './EachTask';


export default function TaskComponents() {
    const hasToken = localStorage.getItem('token')
    console.log(hasToken);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${URL}/api/personal/task/all/`, {
                    method : 'GET',
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${hasToken}`,
                    }

                });
                if (!response.ok){
                    throw new Error('Network Error');
                }
                const data = await response.json();
                setTasks(data.tasks);                
            } catch (err) {
                console.error('Error fetching tasks : ' + JSON.stringify(err));
            }
        };
        fetchTasks();
    }, []);
    return (
        <div>
            {tasks.map((task, index) => (
                <EachTask key={index} index={index} title={task.title} description={task.description} status={task.status} importance={task.importance} created_at={task.created_at} id={task.id} end_by={task.end_by}/>
            ))}
        </div>
    )
}
