import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CustomNavbar.css';
import URL from '../../api';
// import logoImage from 'D://7th Semester/Full Stack Dev Academics/FSD EndSemester/task_manager/task-manager-frontend/src/logo.png';

export default function CustomNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const handleLogout = async () => {
        try {
            const response = await fetch(`${URL}/api/personal/user/logout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                }
            });
            if (response.ok) {
                console.log('User logged out');
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/register');
                }, 0);
            }
            else {
                console.error('User not logged out');
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    return (
        <header>
            <div className="logo">
                <a href="/">
                    <strong>TaskPlannerX</strong>
                </a>
            </div>
            <div className="burger" onClick={toggleMobileMenu}>
                <i className="icon">Menu</i>
            </div>
            <nav className={`navbar ${mobileMenuOpen ? 'mobile-menu' : ''}`}>
                {isLoggedIn ? (
                    <ul className="links">
                        {/* <Link to="/register">
                            <li>Register/Login</li>
                        </Link> */}
                        <div className="burger" onClick={toggleMobileMenu}>
                            <i className="icon">Menu</i>
                        </div>
                        <Link to="/home">
                            <li>Tasks</li>
                        </Link>
                        <Link to="/profile">
                            <li>Profile</li>
                        </Link>
                        <Link to="/analytics">
                            <li>Analytics</li>
                        </Link>
                        <Link to="/teams">
                            <li>Teams</li>
                        </Link>
                        <Link onClick={handleLogout}>
                            <li>Logout</li>
                        </Link>
                    </ul>
                ) : (
                    <ul className="icons">
                        <div className="burger" onClick={toggleMobileMenu}>
                            <i className="icon">Menu</i>
                        </div>
                        <Link to="/register">
                            <li>
                                <i className="icon">Register/Login</i>
                            </li>
                        </Link>
                    </ul>
                )}
            </nav>
        </header>
    );
}