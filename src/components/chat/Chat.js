import React, { useEffect, useState } from 'react';
import { 
  addDoc, 
  collection, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy,
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AiPhone02Icon, EthereumEllipseIcon, PlusSignIcon, PlaneIcon } from 'hugeicons-react';
import ChatRequestPopup from './ChatRequestPopup';
import '../../styles/chat/MessageArea.css';

const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [joinRequest, setJoinRequest] = useState(null);
  const [isRoomCreator, setIsRoomCreator] = useState(false);

  useEffect(() => {
    if (!room) return;

    const checkRoomCreator = async () => {
      const roomRef = doc(db, 'rooms', room);
      const roomDoc = await getDoc(roomRef);
      
      if (roomDoc.exists()) {
        setIsRoomCreator(roomDoc.data().createdBy === auth.currentUser?.uid);
      }
    };

    checkRoomCreator();
  }, [room]);

  useEffect(() => {
    if (!room) return;

    const messagesRef = collection(db, 'rooms', room, 'Messages');
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages = [];
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
    if (!room || newMessage === "") return;

    try {
      const messagesRef = collection(db, 'rooms', room, 'Messages');
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser ? auth.currentUser.email : 'Guest',
        room,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (!room) return;

    const roomRef = doc(db, 'rooms', room);
    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      const roomData = snapshot.data();
      if (roomData?.pendingRequests?.length > 0 && roomData.createdBy === auth.currentUser?.uid) {
        const requestingUser = roomData.pendingRequests[0];
        setJoinRequest({
          uid: requestingUser.uid,
          email: requestingUser.email
        });
      }
    });

    return () => unsubscribe();
  }, [room]);


  const handleJoinRequest = async (accepted) => {
    if (!joinRequest || !room) return;

    try {
      const roomRef = doc(db, 'rooms', room);
      const roomDoc = await getDoc(roomRef);
      const roomData = roomDoc.data();

      if (accepted) {
        await updateDoc(roomRef, {
          participants: arrayUnion(joinRequest.uid),
          pendingRequests: roomData.pendingRequests.filter(
            req => req.uid !== joinRequest.uid
          )
        });
      } else {
        await updateDoc(roomRef, {
          pendingRequests: roomData.pendingRequests.filter(
            req => req.uid !== joinRequest.uid
          )
        });
      }
      setJoinRequest(null);
    } catch (error) {
      console.error("Error handling join request:", error);
    }
  };

  return (
    <div className="message-area">
      {!room ? (
        <div className="no-chat-selected">
          <p>Select a chat to start messaging</p>
        </div>
      ) : (
        <>
          <div className='message-header'>
            <h1>Welcome user : {room}</h1>
            {userEmail ? (
              <h2>User Email: {userEmail}</h2>
            ) : (
              <p>User not authenticated</p>
            )}
            <div className="header-actions">
              <button className="action-btn"><AiPhone02Icon className='phone-ma-btn'/></button>
              <button className="action-btn"><EthereumEllipseIcon className='ellipsisV-ma-btn'/></button>
            </div>
          </div>
          
          <div className="message-content"> 
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.user === userEmail ? 'sent' : 'received'}`}>
                <div className="message-bubble">
                  <span>{message.user}</span>
                  <p>{message.text}</p>
                  <p>{message.serverTimestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className='message-box'>
            <button className="action-btn plus-btn" type="button">
              <PlusSignIcon />
            </button>
            <input
              type="text"
              className='message-input' 
              placeholder='Type here...'
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button type='submit' className='action-btn plus-btn'><PlaneIcon/></button>
          </form>
          {isRoomCreator && joinRequest && (
            <ChatRequestPopup
              requestingUser={joinRequest}
              onAccept={() => handleJoinRequest(true)}
              onDecline={() => handleJoinRequest(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Chat;