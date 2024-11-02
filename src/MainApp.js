import React, { useState, useEffect } from 'react';
import { Auth } from './components/auth/Auth';
import Cookies from 'universal-cookie';
import Chat from './components/chat/Chat';
import ChatList from './components/chat/ChatList';
import Sidebar from './components/chat/Sidebar';
import RoomInput from './components/chat/RoomInput';
import { signOut } from 'firebase/auth';
import { auth, db } from './config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const cookies = new Cookies();

const MainApp = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

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
    return <Auth setIsAuth={setIsAuth} />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <ChatList rooms={rooms} selectedRoom={room} onSelectRoom={setRoom} />
        {room ? (
          <Chat room={room} />
        ) : (
          <RoomInput setRoom={setRoom} />
        )}
      </div>
      <div className='sign-out'>
        <button onClick={signUserOut} className="sign-out-button">Sign Out</button>
      </div>
    </div>
  );
};

export default MainApp; 