import React, { useState, useEffect } from 'react';
import './EachTask.scss';
import URL from '../../api';

export default function EachTask({
    index,
    title,
    description,
    status,
    importance,
    created_at,
    id,
    end_by
}) {
    const [taskStatus, setTaskStatus] = useState(status);
    const isAlt = index % 2 === 1;
    const token = localStorage.getItem('token');
    const updateStatus = async () => {
        try {
            const response = await fetch(
                `${URL}/api/personal/task/update/${id}/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`
                    },
                    body: JSON.stringify({ status: taskStatus })
                }
            );
            if (response.ok) {
                alert('Task updated successfully');
                window.location.reload();
            } else {
                alert('Error updating task');
            }
        } catch (err) {
            console.error('Task failed to update', err.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `${URL}/api/personal/task/delete/${id}/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`
                    }
                }
            );
            if (response.ok) {
                console.log('Task Deleted');
                window.location.reload(); 
            }
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
        <>
            <div className={`blog-card ${isAlt ? 'alt' : ''}`}>
                <div className="meta">
                    <div
                        className="photo"
                        style={{
                            backgroundImage:
                                'url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)'
                        }}
                    ></div>
                    <ul className="details">
                        <li className="author">
                            <a href="#">{status}</a>
                        </li>
                        <li className="date">{created_at}</li>
                        <li className="tags">
                            <ul>
                                <li>
                                    <a href="#">{importance}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="description">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <strong>End By : {end_by}</strong>
                    <select
                        className="inputtext"
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                    >
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="ONGOING">ONGOING</option>
                        <option value="INCOMPLETE">INCOMPLETE</option>
                    </select>
                    <button onClick={updateStatus}>Update Status</button>
                    <button onClick={handleDelete}>Delete Task</button>
                </div>
            </div>
        </>
    );
}
