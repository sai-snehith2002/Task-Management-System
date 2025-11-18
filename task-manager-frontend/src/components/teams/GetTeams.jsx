import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import URL from '../../api';
import './GetTeam.scss';
export default function GetTeams() {
    const initialTeamTask = {
        team: '',
        taskName: '',
        taskDescription: '',
        taskStatus: 'INCOMPLETE',
        taskImportance: 'REGULAR',
        membersCompleted: []
    };
    const [fetchedTeamData, setFetchedTeamData] = useState([]);
    const [teamTaskData, setTeamTaskData] = useState(initialTeamTask);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${URL}/api/teams/get-teams/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setFetchedTeamData(data.teams);
                }
            } catch (error) {
                throw new Error(error);
            }
        };
        fetchTeams();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeamTaskData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/teams/task/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(teamTaskData)
            });

            if (response.ok) {
                setTeamTaskData(initialTeamTask);
            } else {
                console.error('Failed to create task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };
    return (
        <div className="team-section">
        <div>
            <h2>Fetched Teams</h2>
                <ul>
                    {fetchedTeamData.map((team) => (
                        <li key={team.id}>
                            <div>
                                <h3>Team ID: Team Name</h3>
                                <h3>{team.id}.{team.name}</h3>
                                {/* <ul>
                                    {team.members.map((member, index) => (
                                        <p key={`${team.id}-${index + 1}`}>Member {index + 1} - {member}</p>
                                        
                                    ))}
                                </ul> */}
                            </div>
                        </li>
                    ))}
                </ul>
            <Link to="/teams/create">Create new Team</Link>

            <h2>Create Team Task</h2>
            <form onSubmit={handleCreateTask}>
                <label>
                    Enter Team ID:
                    <input
                        type="text"
                        name="team"
                        value={teamTaskData.team}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Enter the Task Name:
                    <input
                        type="text"
                        name="taskName"
                        value={teamTaskData.taskName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Task Description:
                    <textarea
                        name="taskDescription"
                        value={teamTaskData.taskDescription}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Task Importance:
                    <select
                        name="taskImportance"
                        value={teamTaskData.taskImportance}
                        onChange={handleInputChange}
                    >
                        <option value="URGENT">Urgent</option>
                        <option value="REGULAR">Regular</option>
                        <option value="IMPORTANT">Important</option>
                    </select>
                </label>
                <br />

                <button type="submit">Create Task</button>
            </form>
            <Link to="/teams/task">Check Task and Update</Link>
        </div>
        </div>
    );
}
