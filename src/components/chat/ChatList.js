import React, { useState, useEffect } from 'react';
import '../../styles/chat/ChatList.css';
import RoomInput from './RoomInput';
import { Search02Icon } from 'hugeicons-react';
import { auth } from '../../config/firebase';

const ChatList = ({ rooms, selectedRoom, onSelectRoom }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    if (!rooms) return;
    
    // Filter rooms based on permissions and search query
    const userRooms = rooms.filter(room => {
      const matchesSearch = room.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const hasPermission = room.type === 'public' || 
        (room.participants && room.participants.includes(auth.currentUser?.uid));
      
      return matchesSearch && hasPermission;
    });

    setFilteredRooms(userRooms);
  }, [rooms, searchQuery]);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>
      </div>

      <div className="rooms-container">
        {filteredRooms.map((room) => (
          <div 
            key={room.id}
            className={`room-item ${selectedRoom === room.id ? 'active' : ''}`}
            onClick={() => onSelectRoom(room.id)}
          >
            <div className="room-avatar">
              <div className="avatar-placeholder" />
            </div>
            <div className="room-info">
              <h4>{room.displayName || room.name || room.id}</h4>
              <p>{room.type === 'private' ? 'Private Chat' : 'Public Room'}</p>
              {room.lastMessage && (
                <p className="last-message">
                  <span className="sender">{room.lastMessage.sender}: </span>
                  {room.lastMessage.text}
                </p>
              )}
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