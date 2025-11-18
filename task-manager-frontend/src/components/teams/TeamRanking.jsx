import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import URL from '../../api';

export default function TeamRanking() {
    const { id } = useParams();
    const [teamRanking, setTeamRanking] = useState([]);
    const token = localStorage.getItem('token');
    useEffect (() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch(`${URL}/api/teams/utils/${id}/ranking/`, {
                    method: 'GET',
                    headers: {
                        Authorization : `Token ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTeamRanking(data.data);
                }
            }catch(err) {
                console.error(err);
            }
        } 
        fetchRatings();
    }, [])
    return (
        <div>
            {teamRanking.map((member, index) =>(
                <div key={index}>
                    <strong>{member.member} Rank- {index + 1}</strong>
                    <p>completed task: {member.completed_task}</p>
                    <p>Total Task : {member.total_task}</p>
                </div>
            ))}
        </div>
    )
}
