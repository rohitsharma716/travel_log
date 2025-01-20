import React, { useState } from 'react';
import './UserMenu.css';

const UserMenu = ({ userId, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const loginTime = localStorage.getItem('loginTime') || 'Unknown';

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        // Add password change logic here
        setShowPasswordModal(false);
        setNewPassword('');
    };

    return (
        <div className="user-menu-container">
            <button 
                className="user-menu-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="user-id">{userId}</span>
                <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
            </button>

            {isOpen && (
                <div className="user-menu-dropdown">
                    <div className="user-info">
                        <div className="user-detail">
                            <span className="label">User ID:</span>
                            <span className="value">{userId}</span>
                        </div>
                        <div className="user-detail">
                            <span className="label">Login Time:</span>
                            <span className="value">{new Date(loginTime).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="menu-items">
                        <button onClick={() => setShowPasswordModal(true)}>
                            Change Password
                        </button>
                        <button onClick={onLogout}>Logout</button>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div className="modal-overlay">
                    <div className="password-modal">
                        <h3>Change Password</h3>
                        <form onSubmit={handlePasswordChange}>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="submit">Save</button>
                                <button 
                                    type="button" 
                                    onClick={() => setShowPasswordModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu; 