import React, { useState } from 'react';
import Profile from './Profile';
import Account from './Account';
import Appearance from './Appearance';
import UserGuide from './UserGuide';
import '../../styles/settings/Settings.css'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleSettingsIconClick = () => {
    setActiveTab('profile');
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <button onClick={handleSettingsIconClick}>⚙️ Settings</button>
        <ul>
          <li onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</li>
          <li onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>Account</li>
          <li onClick={() => setActiveTab('appearance')} className={activeTab === 'appearance' ? 'active' : ''}>Appearance</li>
          <li onClick={() => setActiveTab('userguide')} className={activeTab === 'userguide' ? 'active' : ''}>UserGuide</li>
        </ul>
      </div>
      <div className="settings-content">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'account' && <Account />}
        {activeTab === 'appearance' && <Appearance />}
        {activeTab === 'userGuide' && <UserGuide />}
      </div>
    </div>
  );
};

export default Settings;