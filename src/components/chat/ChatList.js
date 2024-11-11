import React, { useState, useEffect } from 'react';
import '../../styles/chat/ChatList.css';
import RoomInput from './RoomInput';
import { Search02Icon } from 'hugeicons-react';
import { auth } from '../../config/firebase';
import { doc, getDoc, updateDoc, arrayRemove, collection, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';

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

  const handleDeleteRoom = async (roomId) => {
    try {
      const roomRef = doc(db, 'rooms', roomId);
      const roomDoc = await getDoc(roomRef);
      const roomData = roomDoc.data();

      if (roomData.createdBy === auth.currentUser.uid) {
        // Delete all messages in the room
        const messagesRef = collection(db, 'rooms', roomId, 'Messages');
        const messagesSnapshot = await getDocs(messagesRef);
        const batch = writeBatch(db);

        messagesSnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        // Delete the room document
        batch.delete(roomRef);
        await batch.commit();

        // If this was the selected room, clear the selection
        if (selectedRoom === roomId) {
          onSelectRoom(null);
        }
      } else {
        // For non-creators, just remove themselves from participants
        await updateDoc(roomRef, {
          participants: arrayRemove(auth.currentUser.uid)
        });
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

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
          >
            <div 
              className="room-content"
              onClick={() => onSelectRoom(room.id)}
            >
              <div className="room-avatar">
                <div className="avatar-placeholder" />
              </div>
              <div className="room-info">
                <h4>{room.displayName || room.name || room.id}</h4>
                <p>{room.type === 'private' ? 'Private Chat' : 'Public Room'}</p>
              </div>
            </div>
            <button 
              className="room-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                const isCreator = room.createdBy === auth.currentUser.uid;
                if (window.confirm(`Are you sure you want to ${isCreator ? 'delete' : 'exit'} this room?`)) {
                  handleDeleteRoom(room.id);
                }
              }}
            >
              {room.createdBy === auth.currentUser.uid ? 'Delete' : 'Exit'}
            </button>
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
