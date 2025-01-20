import React, { useState } from 'react';
import { registerUser } from '../API';
import './Auth.css';

const Register = ({ onRegisterSuccess }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Password validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const data = await registerUser({ userId, password });
            if (data.userId) {
                onRegisterSuccess();
            }
        } catch (error) {
            setError('User ID already exists or registration failed');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register New User</h2>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register; 