import React, { useState } from 'react';
import '../../styles/chat/ChatList.css';
import RoomInput from './RoomInput';
import { Search02Icon } from 'hugeicons-react';

const ChatList = ({ rooms, selectedRoom, onSelectRoom }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2 className="gradient-text">Chat Rooms</h2>
        <div className={`search ${isSearchFocused ? 'focused' : ''}`}>
          <div className="chat-search-container">
            <Search02Icon className="search-icon" />
            <input 
              type="text" 
              placeholder="Search rooms..." 
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>
      </div>

      <div className="rooms-container">
        {rooms && rooms.map((room) => (
          <div 
            key={room.id}
            className={`room-item ${selectedRoom === room.id ? 'active' : ''}`}
            onClick={() => onSelectRoom(room.id)}
          >
            <div className="room-avatar">
              <div className="avatar-placeholder" />
            </div>
            <div className="room-info">
              <h4>{room.name || room.id}</h4>
              <p>Click to join the conversation</p>
            </div>
          </div>
        ))}
      </div>

      <div className="room-input-wrapper">
        <RoomInput setRoom={onSelectRoom} />
      </div>
    </div>
  );
};

export default ChatList;