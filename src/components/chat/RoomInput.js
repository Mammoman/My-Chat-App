import React, { useRef } from 'react';

function RoomInput({ setRoom }) {
    const roomInputRef = useRef(null);

  return (
    <div className='room'>
      <label> Room name hh</label>
      <input ref={roomInputRef} />
      <button onClick={() => setRoom(roomInputRef.current.value)}>
        Chat
      </button>
    </div>
  );
};


export default RoomInput; 