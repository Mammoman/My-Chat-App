{/*import React, { useState, useEffect } from 'react';
import { faSearch, faPhone, faEllipsisV, faPlus, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendMessage, listenForMessages } from '../../services/messagingService';
import { auth } from '../../config/firebase';
import '../../styles/chat/MessageArea.css';

const MessageArea = ({ selectedUser }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (selectedUser) {
            const unsubscribe = listenForMessages(auth.currentUser.uid, (newMessages) => {
                setMessages(newMessages);
            });
            return () => unsubscribe(); // Cleanup subscription on unmount
        }
    }, [selectedUser]);

    const handleSendMessage = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (message.trim()) {
            const newMessage = {
                senderId: auth.currentUser.uid,
                receiverId: selectedUser.uid,
                text: message,
                time: new Date().toLocaleTimeString(),
                isSent: true,
                timestamp: new Date() // Add timestamp for ordering
            };

            await sendMessage(newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Update local state
            setMessage('');
        }
    };

    return (
        <div className="message-area">
            {selectedUser ? (
                <>
                    <div className="message-header">
                        <div className="user-info">
                            <div className="chat-avatar">
                                <img src={selectedUser.avatar} alt="" className="avatar-image" />
                                <div className={`status ${selectedUser.isOnline ? 'online' : ''}`}></div>
                            </div>
                            <div className="user-details">
                                <h2>{selectedUser.name}</h2>
                                <span className="members-count">23 members, 10 online</span>
                            </div>
                        </div>
                        <div className="header-actions">
                            <button className="action-btn search-ma-btn"><FontAwesomeIcon icon={faSearch}/></button>
                            <button className="action-btn"><FontAwesomeIcon icon={faPhone} className='phone-ma-btn'/></button>
                            <button className="action-btn"><FontAwesomeIcon icon={faEllipsisV} className='ellipsisV-ma-btn'/></button>
                        </div>
                    </div>
                    <div className="message-content">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.senderId === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                <div className="message-bubble">
                                    <p>{msg.text}</p>
                                    <span className="time">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form className="message-box" onSubmit={handleSendMessage}>
                        <button className="action-btn plus-btn" type="submit">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="message-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)} // Send on Enter key
                        />
                        <button className="action-btn microphone-btn" type="button">
                            <FontAwesomeIcon icon={faMicrophone} />
                        </button>
                    </form>
                </>
            ) : (
                <div className="no-chat-selected">
                    <p>Select a chat to start messaging</p>
                </div>
            )}
        </div>
    );
};

export default MessageArea;