{/*import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faCog, faSignOutAlt, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import '../../styles/chat/Sidebar.css';
import Settings from '../settings/Settings';

const Sidebar = () => {
    const navigate = useNavigate();
    const currentUser = auth.currentUser;
    const [showSettings, setShowSettings] = useState(false);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <div className="user-avatar">
                    {currentUser?.photoURL ? (
                        <img src={currentUser.photoURL} alt="" className="avatar-image" />
                    ) : (
                        <div className="avatar-placeholder">
                            {currentUser?.email?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <div className="sidebar-menu">
                
                <button className="menu-item">
                    <FontAwesomeIcon icon={faMessage} />
                    <p>All chats</p>
                </button>
                <button className="menu-item">
                    <FontAwesomeIcon icon={faFolderClosed} />
                    <p>Archived</p>
                </button>
               
            </div>

            <div className="sidebar-bottom">
            <button className="menu-item" onClick={toggleSettings}>
                    <FontAwesomeIcon icon={faCog} />
                    <p>Settings</p>
                </button>

                <button className="menu-item logout" onClick={handleSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <p>Logout</p>
                </button>
            </div>

            {showSettings && (
                <div className="settings-overlay">
                    <Settings />
                    <button className="close-settings" onClick={toggleSettings}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;