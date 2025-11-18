import React, { useState, useEffect } from 'react';
import URL from '../../api';
import './CreateTeam.scss'

export default function CreateTeam() {
    const initialTeamData = {
        name: '',
        members: []
    };
    const [allUser, setAllUser] = useState(null);
    const [teamData, setTeamData] = useState(initialTeamData);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${URL}/api/teams/utils/get-users/`,
                    {
                        method: 'GET'
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch api');
                }
                const data = await response.json();
                setAllUser(data.user_data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeamData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddMember = (userId) => {
        setTeamData((prevData) => ({
            ...prevData,
            members: [...prevData.members, userId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(teamData);
        try {
            const response = await fetch(`${URL}/api/teams/create-team/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Team created', data);
            } else {
                console.error('Failed to create team', data);
            }
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Team Name:
                    <input
                        type="text"
                        name="name"
                        value={teamData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Team Members:
                    <select onChange={(e) => handleAddMember(e.target.value)}>
                        <option value="" disabled selected>
                            Select a member
                        </option>
                        {allUser &&
                            allUser.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                    </select>
                </label>
                <br />

                <ul>
                    {teamData.members.map((memberId) => (
                        <li key={memberId}>{memberId}</li>
                    ))}
                </ul>

                <button type="submit">Create Team</button>
            </form>
        </>
    );
}
