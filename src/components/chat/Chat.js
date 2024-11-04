import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../../styles/chat/MessageArea.css'; // Import the CSS file

const Chat = (props) => {
  const { room } = props;  
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  const messagesRef = collection(db, `Rooms/${room}/Messages`);

  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser ? auth.currentUser.email : 'Guest', // Set user as 'Guest' if not authenticated
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="message-area">
      <div className='message-header'>
        <h1>Welcome user : {room}</h1>
        {userEmail ? (
          <h2>User Email: {userEmail}</h2>
        ) : (
          <p>User not authenticated</p>
        )}
      </div>
      
      <div className="message-content"> 
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.user === userEmail ? 'sent' : 'received'}`}>
            <div className="message-bubble">
              <span>{message.user}</span>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='message-box'>
        <input className='message-input' 
          placeholder='Type here...'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type='submit' className='action-btn plus-btn'>Send</button>
      </form>
    </div>
  );
};

export default Chat;