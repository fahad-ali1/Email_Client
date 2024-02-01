import React from "react";

import './BodyView.css'; 

const BodyView = ({ selectedEmail, handleDelete, handleInbox}) => {
    const {from, subject, address, time, message } = selectedEmail;

    return (
      <div className="emailInfo">
        <div className="emailFromBody">From: {from}</div>
        <div className="emailSubjectBody">Subject: {subject}</div>
        <div className="emailAddressBody">Address: {address}</div>
        <div className="emailTimeBody">Time: {time}</div>
        <div className="emailMessageBody">{message}</div>
        <button className="deleteMessageButton" onClick={handleDelete}>Delete Email</button>
        <button className="moveToInbox" onClick={handleInbox}>Move to Inbox</button>
      </div>
    );
  };

export default BodyView