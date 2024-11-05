import React from 'react';
import '../../styles/chat/ChatList.css';
import RoomInput from './RoomInput';

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

      <div>
        <RoomInput setRoom={onSelectRoom} />
      </div>

    
     
    </div>
  );
};

export default ChatList;