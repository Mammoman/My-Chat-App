import React, { useState, useRef, useEffect } from 'react';
import { Auth } from './components/auth/Auth';
import Cookies from 'universal-cookie';
import Chat from './components/chat/Chat';
import ChatList from './components/chat/ChatList';
import Sidebar from './components/chat/Sidebar';
import { signOut } from 'firebase/auth';
import { auth, db } from './config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const cookies = new Cookies();

const MainApp = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  useEffect(() => {
    const roomsRef = collection(db, "rooms");
    const unsubscribe = onSnapshot(roomsRef, (snapshot) => {
      const roomsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomsData);
    });

    return () => unsubscribe();
  }, []);

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <ChatList rooms={rooms} selectedRoom={room} onSelectRoom={setRoom} />
        {room ? (
          <Chat room={room} />
        ) : (
          <div className='room'>
            <label> Room name</label>
            <input ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current.value)}>
              Chat
            </button>
          </div>
        )}
      </div>
      <div className='sign-out'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default MainApp; 