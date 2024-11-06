import React, { useState, useEffect } from "react";
import "../../styles/auth/UserGuide.css"
import { ArrowRight03Icon, Cancel02Icon } from 'hugeicons-react';

const UserGuide = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalPages = 5;

  const handlePageChange = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const nextPage = currentPage < totalPages ? currentPage + 1 : 1;
    
    // Add exit animation class
    const currentGuide = document.querySelector(`.guide.active`);
    currentGuide?.classList.add('exit');

    // Wait for exit animation to complete
    setTimeout(() => {
      setCurrentPage(nextPage);
      setIsAnimating(false);
    }, 400);
  };

  useEffect(() => {
    // Remove exit class from new active guide
    const activeGuide = document.querySelector(`.guide.active`);
    activeGuide?.classList.remove('exit');
  }, [currentPage]);

  const guides = [
    {
      title: "Welcome new user",
      content: ["To My-Chat-App", "Here's a breakdown on how to use this app."]
    },
    {
      title: "Setting up a Room",
      content: [
        "1. Room visibility can be set to either Private or Public",
        "2. Private rooms are for one-on-one conversations",
        "3. Public rooms are for group chats"
      ]
    },
    {
      title: "Messaging",
      content: [
        "1. Type your message in the input box",
        "2. Press enter or click the send button to send",
        "3. You can see when messages are delivered"
      ]
    },
    {
      title: "Profile Settings",
      content: [
        "1. Customize your profile picture",
        "2. Update your display name",
        "3. Manage notification preferences"
      ]
    },
    {
      title: "Need Help?",
      content: [
        "Contact support if you need assistance",
        "Email: support@mychatapp.com"
      ]
    }
  ];

  return (
    <div className="userguide-container">
      <button className="close-guide" onClick={onClose}>
        <Cancel02Icon />
      </button>

      {guides.map((guide, index) => (
        <div 
          key={index} 
          className={`guide ${currentPage === index + 1 ? 'active' : ''}`}
        >
          <h2>{guide.title}</h2>
          {guide.content.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      ))}


      <div className="page-switcher">
        <button onClick={handlePageChange} disabled={isAnimating}>
          <ArrowRight03Icon />
          <span>Next Page ({currentPage}/{totalPages})</span>
        </button>
      </div>
    </div>
  );
};

export default UserGuide;