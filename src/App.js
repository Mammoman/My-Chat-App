import React, { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/auth/Auth';
import Cookies from 'universal-cookie';
import Chat from './components/chat/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';

const cookies = new Cookies();

function App () {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }           
    
  return (
    <>
      {room ? (
       <Chat room={room} />
      ) : (
        <div className='room'>
          <label> room name</label>
          <input ref={roomInputRef} />
          <button onClick={ () => setRoom(roomInputRef.current.value)}>
            Chat</button>
        </div>
      )}

      <div className='sign-out'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
