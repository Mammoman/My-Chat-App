import React, { useState, useEffect } from 'react';
import { Auth } from './components/auth/Auth';
import Cookies from 'universal-cookie';
import Chat from './components/chat/Chat';
import ChatList from './components/chat/ChatList';
import Sidebar from './components/chat/Sidebar';
import { signOut } from 'firebase/auth';
import { auth, db } from './config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './App.css';
import { Menu01Icon, ArrowLeft01Icon } from 'hugeicons-react';

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const handleRoomSelect = (selectedRoom) => {
    setRoom(selectedRoom);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />;
  }

  if (isMobileView) {
    return (
      <div className="mainpage-container">
        <div className="mobile-nav">
          {room ? (
            <button className="back-button" onClick={() => setRoom(null)}>
              <ArrowLeft01Icon /> Back to Rooms
            </button>
          ) : (
            <button className="hamburger-menu" onClick={toggleSidebar}>
              <Menu01Icon />
            </button>
          )}
        </div>

        <div className={`mobile-overlay ${isSidebarOpen ? 'active' : ''}`} 
             onClick={() => setIsSidebarOpen(false)} />
             
        <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <Sidebar signUserOut={signUserOut} />
        </div>

        <div className="mobile-content">
          <ChatList 
            rooms={rooms} 
            selectedRoom={room} 
            onSelectRoom={handleRoomSelect}
            style={{ display: room ? 'none' : 'flex' }}
          />
          <div className={`chat-area-container ${room ? 'active' : ''}`}>
            {room && <Chat room={room} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mainpage-container">
      <Sidebar signUserOut={signUserOut} />
      <ChatList rooms={rooms} selectedRoom={room} onSelectRoom={setRoom} />
      <Chat room={room} />
    </div>
  );
};

export default App;


 

 