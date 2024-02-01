import React from "react";

import "./deleted.css";

const Deleted = ({setDeletedView, setInboxView}) => {

  const handleDeleteView = () => {
    console.log("Delet button")
    setInboxView(false)
    setDeletedView(true)
  };

return (
  <button className="deleteButton" onClick={handleDeleteView}>
    Deleted Mails
  </button>
);
};

export default Deleted;