import React, { useRef } from 'react';
import '../../styles/chat/RoomInput.css';


function RoomInput({ setRoom }) {
    const roomInputRef = useRef(null);

  return (
    <div className='room'>
      <label> Enter Room name: </label>
      <input ref={roomInputRef} />
      <button onClick={() => setRoom(roomInputRef.current.value)}>
        Chat
      </button>
    </div>
  );
};


export default RoomInput; 