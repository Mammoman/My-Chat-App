import React from 'react';
//import { Search01Icon } from 'hugeicons-react'; 
import '../../styles/chat/ChatList.css';

const ChatList = ({ rooms, selectedRoom, onSelectRoom }) => {
  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2>Chat Rooms</h2>
        <div className="search">
          <div className="chat-search-container">
            <input type="text" placeholder="Search" />
          </div>
          <span>Search</span>
        </div>
      </div>

      <div className="messages-section">
        {rooms.map(room => (
          <div 
            key={room.id} 
            className={`chat-item ${selectedRoom?.id === room.id ? 'active' : ''}`}
            onClick={() => onSelectRoom(room)}
          >
            <div className="chat-info">
              <div className="chat-header">
                <h4>{room.name}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;