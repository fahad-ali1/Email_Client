import React from "react";

import "./inbox.css";

const Inbox = ({setInboxView, setDeletedView}) => {

  const handleInboxView = () => {
    console.log("inbox button")
    setDeletedView(false)
    setInboxView(true)
  };

  return (
    <button className="inboxButton" onClick={handleInboxView}>
      Show Inbox
    </button>
  );
};

export default Inbox;