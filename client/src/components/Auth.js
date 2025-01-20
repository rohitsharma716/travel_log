import React, { useState } from 'react';
import { loginUser } from '../API';
import Register from './Register';
import './Auth.css';

const Auth = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ userId, password });
            if (data.userId) {
                onLogin(data.userId);
                localStorage.setItem('userId', data.userId);
            }
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    if (isRegistering) {
        return <Register onRegisterSuccess={() => setIsRegistering(false)} />;
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
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
                <button type="submit">Login</button>
                <div className="auth-switch">
                    Don't have an account? 
                    <button 
                        type="button" 
                        className="switch-button"
                        onClick={() => setIsRegistering(true)}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth; 