import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';


const Chat = (props) => {
     const{ room } = props;  
   const [newMessage, setnewMessage]= useState("");
   const [messages, setMessages] = useState([]);

   const messagesRef = collection(db, "messages");

   useEffect(() => {
    const queryMessages = query(messagesRef,  
      where("room", "==", room),
        orderBy("createdAt")
      );
     const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
           messages.push({...doc.data(), id: doc.id})
        });

        setMessages(messages);
      });

      return () => unsubscribe();
   }, []);

  const handleSubmit = async (e)  => {
    e.preventDefault();
    if (newMessage === "")  return;

    // Check if the user is authenticated
    if (!auth.currentUser) {
        console.error("User is not authenticated");
        return; // Exit if the user is not authenticated
    }

    await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.uid,
        room,
    });

      setnewMessage("");
  };

  return (
    <div className="mainpage-container">
        <div className='header'>
          <h1>welcome user : {room}</h1>
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
        placeholder='type here...'
        onChange={(e) => setnewMessage(e.target.value)}
        value = {newMessage}
        />
        <button type='submit' className='send-button'>send</button>
      </form>
    </div>
  );
};

export default Chat;