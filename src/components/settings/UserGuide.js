import React from "react";
import  "../../styles/auth/UserGuide.css"
import { ArrowRight03Icon } from 'hugeicons-react';

const handlePageChange = {

};


const Userguide = () => {
  return (
    <div className= "userguide">
       

        <div className='guide pg-1'>
             <p>Welcome new user</p>
             <span>To My-Chat-App</span>
             <p>Okay, a Breakdown on how to Work this app.</p>
        </div>

        <div className='guide pg-2'>
             <p>Set a room.</p>
             <p>Room visibility can be set to either Private or Public.</p>
             <p>Recommended </p>
             <p>Set to Private room for conversations between just two people.</p>
             <p>Set to Public room for a group chat.</p>
        </div>

        <div className='guide pg-3'>
             
        </div>

        <div className='guide pg-4'>

        </div>

        <div className='guide pg-5'>

        </div>

        <div className='page-switcher'>
        <button onClick = {handlePageChange} > <ArrowRight03Icon/> </button>
       </div>
      
    </div>
  );
}  

export default Userguide;

 