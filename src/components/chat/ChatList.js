{/*import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../styles/chat/ChatList.css';

const ChatList = ({ users, quickAccess, selectedUser, onSelectUser }) => {
  return (
    
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2>Messages</h2>
        <p>23 members, 10 online</p>
        <div className=''>
        <div className="search">
          <div className="chat-search-container">
            <input type="text" placeholder="Search" /> 
          </div>
          <span>Search</span>
        </div>
        </div>
      </div>

      <div className="messages-section">
        {users.map(user => (
          <div 
            key={user.id} 
            className={`chat-item ${selectedUser?.id === user.id ? 'active' : ''}`}
            onClick={() => onSelectUser(user)}
          >
            <div className="chat-avatar">
              <img src={user.avatar} alt="" className="avatar-image" />
              <div className={`status ${user.isOnline ? 'online' : ''}`}></div>
            </div>
            <div className="chat-info">
              <div className="chat-header">
                <h4>{user.name}</h4>
                <span className="time">{user.time}</span>
              </div>
              <div className="chat-message">
                <p>{user.message}</p>
                {user.pinned && <span className="pin-icon">📌</span>}
                {user.unread && <div className="unread-badge">{user.unread}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;