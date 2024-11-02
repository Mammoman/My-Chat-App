import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Chat = (props) => {
  const { room } = props;  
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  const messagesRef = collection(db, `Rooms/${room}/Messages`);

  useEffect(() => {
    const queryMessages = query(messagesRef,  
      orderBy("createdAt")
    );
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
      console.log("Auth state changed:", user);
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

    // Check if the user is authenticated
    if (!auth.currentUser) {
      console.error("User is not authenticated");
      return; // Exit if the user is not authenticated
    }

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.email, // Store the user's email instead of UID
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="mainpage-container">
      <div className='header'>
        <h1>Welcome user: {room}</h1>
        {userEmail ? (
          <h2>User Email: {userEmail}</h2>
        ) : (
          <h2>User not authenticated</h2>
        )}
      </div>
      <div> 
        {messages.map((message) => (
          <div key={message.id}>
            <span>{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='new-message-form'>
        <input className='new-message-input' 
          placeholder='Type here...'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type='submit' className='send-button'>Send</button>
      </form>
    </div>
  );
};

export default Chat;