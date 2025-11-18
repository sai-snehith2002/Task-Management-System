import React, { useState, useEffect } from 'react';
import URL from '../../api';
import './Profile.scss';

export default function Profile() {
    const inititalProfileData = {
        username: '',
        email: '',
        name: '',
        about: ''
    };
    const [profileData, setProfileData] = useState({ ...inititalProfileData });
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    `${URL}/api/personal/user/profile/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${token}`
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                console.log(data);
                setProfileData({ ...inititalProfileData, ...data.profile });
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [token]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setProfileData(prevProfileData => ({
          ...prevProfileData,
          [name]: value
        }));
      };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/personal/user/profile/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(profileData)
            });
            if (response.ok) {
                alert('Profile Updated');
            } else {
                console.error('Error Updating profile');
            }
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
        <div className="card" style={{width: 18 + 'rem'}}>
            <div className="ok-title">User Details</div>
            <div className="card-body">
                <input
                    name="name"
                    className="card-title"
                    value={profileData.name}
                    onChange={handleInput}
                    placeholder="Name"
                />
                <input
                    name="email"
                    className="card-subtitle mb-2 text-muted"
                    value={profileData.email}
                    onChange={handleInput}
                    placeholder="Email"
                />
                <input
                    name="about"
                    className="card-title"
                    value={profileData.about}
                    onChange={handleInput}
                    placeholder="About"
                />
                <button className="btn btn-primary" onClick={updateProfile}>
                    Update
                </button>
            </div>
        </div>
    );
}
