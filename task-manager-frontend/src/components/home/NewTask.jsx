import React, { useState } from 'react';
import './NewTask.scss';
import URL from '../../api';
export default function NewTask() {
    const initialTaskData = {
        title: '',
        description: '',
        status: '',
        importance: '',
        end_by : ''
    };
    const [newTask, setNewTask] = useState({ ...initialTaskData });
    const token = localStorage.getItem('token');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newTask);

        try {
            const response = await fetch(`${URL}/api/personal/task/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Token ${token}`,
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                alert('New Task Created');
                window.location.reload();
            } else {
                console.error('Error Creating Task');
            }
        } catch (err) {
            console.error('Error task creation: ', err.message);
        }
    };

    return (
        <>
            <div className="card-form">
                <form className="signup">
                    <div className="form-title">Create New Task</div>
                    <div className="form-body">
                        <div className="row">
                            <input
                                type="text"
                                name="title"
                                onChange={handleInputChange}
                                placeholder="Task Title"
                            />
                            <textarea
                                type="text"
                                name="description"
                                onChange={handleInputChange}
                                placeholder="Task Description"
                            />
                        </div>
                        <div className="row">
                            <select
                                name="status"
                                value={newTask.status}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Task Status</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="ONGOING">ONGOING</option>
                                <option value="INCOMPLETE">INCOMPLETE</option>
                            </select>
                            <select
                                name="importance"
                                value={newTask.importance}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Task Importance</option>
                                <option value="REGULAR">REGULAR</option>
                                <option value="IMPORTANT">IMPORTANT</option>
                                <option value="URGENT">URGENT</option>
                            </select>
                        </div>
                        <div className="row">
                            <input
                            type="date"
                            name="end_by"
                            onChange={handleInputChange}
                            placeHolder = "Enter End Date"
                            />
                        </div>
                    </div>
                    <div className="rule"></div>
                    <div className="form-footer">
                        <a onClick={handleSubmit}>
                            Create New Task
                            <span className="fa fa-thumbs-o-up"></span>
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
}
