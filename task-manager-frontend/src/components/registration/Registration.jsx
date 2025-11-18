import React, { useState } from 'react';
import './Registration.css';
import URL from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Registration() {

    const navigate = useNavigate();
    const initialRegistration = {
        username: '',
        password: '',
        name: '',
        email: '',
        about: ''
    };
    const initialLogin = {
        username: '',
        password: ''
    };
    const [currentPage, setCurrentPage] = useState('login');
    const [newRegistration, setNewRegistration] = useState({
        ...initialRegistration
    });
    const [newLogin, setNewLogin] = useState({ ...initialLogin });

    const registrationHandleChange = (e) => {
        const { name, value } = e.target;
        setNewRegistration({
            ...newRegistration,
            [name]: value
        });
    };

    const loginHandleChange = (e) => {
        const { name, value } = e.target;
        setNewLogin({
            ...newLogin,
            [name]: value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${URL}/api/personal/user/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLogin)
            });
            if (!response.ok) {
                console.error('Login Failed:', response.error);
                return;
            }

            const data = await response.json();

            const token = data.token;
            localStorage.setItem('token', token);
            console.log('Token stored in localStorage: ', token);
            navigate('/home');
        } catch (error) {
            console.error('Error during Login: ', error);
        }
    };

    const handleRegistrationSubmit = async (e) => {
        console.log(newRegistration);
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/personal/user/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRegistration)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Registration Successful:', data);
            }
            if (!response.ok) {
                const data = await response.json();
                console.error('Registration Failure:', data);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const openLoginPage = () => {
        setCurrentPage('login');
    };

    const openRegPage = () => {
        setCurrentPage('register');
    };

    return (
        <form className="form">
            <div className="action">
                <span
                    className={`load ${currentPage === 'login' ? 'show' : ''} title`}
                    onClick={openLoginPage}
                    id="login-action"
                >
                    Login
                </span>
                <span
                    className={`load ${
                        currentPage === 'register' ? 'show' : ''
                    } title`}
                    onClick={openRegPage}
                    id="reg-action"
                >
                    Register
                </span>
            </div>
            {currentPage === 'login' && (
                <div className="login show-page">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={loginHandleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={loginHandleChange}
                    />
                    <button onClick={handleLoginSubmit}>Login</button>
                    <a onClick={openRegPage}>Register</a>
                </div>
            )}
            {currentPage === 'register' && (
                <div className="reg show-page">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={registrationHandleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={registrationHandleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={registrationHandleChange}
                    />
                    <button onClick={handleRegistrationSubmit}>Register</button>
                    <a onClick={openLoginPage}>Login</a>
                </div>
            )}
        </form>
    );
}
