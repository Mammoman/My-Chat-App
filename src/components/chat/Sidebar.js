import React from 'react';
import { Settings02Icon, Folder01Icon, Logout02Icon, Mail01Icon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import '../../styles/chat/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
          <Mail01Icon />
          <p>All Rooms</p>
        </button>
        <button className="menu-item">
          <Folder01Icon />
          <p>Archived</p>
        </button>
      </div>

      <div className="sidebar-bottom">
      <button className="menu-item">
           <Settings02Icon/>
           <p>Settings</p>
      </button>
        
        <button className="menu-item" onClick={handleSignOut}>
          <Logout02Icon/>
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;