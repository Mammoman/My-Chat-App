{/*
import React, { useState } from 'react';
import Profile from './Profile';
import Account from './Account';
import Appearance from './Appearance';
import '../../styles/settings/Settings.css'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
 

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <ul>
          <li onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</li>
          <li onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>Account</li>
          <li onClick={() => setActiveTab('appearance')} className={activeTab === 'appearance' ? 'active' : ''}>Appearance</li>
        </ul>
      </div>
      <div className="settings-content">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'account' && <Account />}
        {activeTab === 'appearance' && <Appearance />}
      </div>
    </div>
  );
};

export default Settings;