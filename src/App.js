import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarView from "./components/sidebar/SidebarView.jsx";
import BodyView from "./components/body/BodyView.jsx";
import SearchBar from "./components/search/search.jsx";
import Deleted from './components/deleted/deleted.jsx';
import Inbox from './components/inbox/inbox.jsx';
import './App.css';

function App() {
  const [originalEmails, setOriginalEmails] = useState([]); 
  const [emails, setEmails] = useState([]); 
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      const response = await axios.get(
        'https://gist.githubusercontent.com/mrchenliang/15e1989583fd6e6e04e1c49287934c91/raw/ed03cfea1e2edb0303543d2908cd7429ed75580d/email.json',
      );
      setOriginalEmails(response.data); // original unfiltered
      setEmails(response.data); // filtered
    };
    fetchEmails();
  }, []);

  useEffect(() => {
    if (selectedEmail) {
      const updatedEmailsStatus = emails.map(email => {
        // Index emails until currently selected email found
        if (email.id === selectedEmail.id) {
          // Active true or false for email
          email.active = !email.active;
          email.read = false;

          // TODO: Implement delete functionality
          if (email.id === selectedEmail.id && email.deleteMessageButton) {
            email.deleted = true;
          } else {
            email.deleted = false;
          }
        } else {
          // Deactivates previous selected email
          email.active = false;
        }
        return email;
      });
      // testing in browser
      console.log('Clicked Email:', selectedEmail);
      // Update list of emails to new statuses
      setEmails(updatedEmailsStatus);
    }
  }, [selectedEmail]);

  useEffect(() => {
    let filteredEmails = [];
    if (searchInput === "") {
      // If searchInput is empty, display all emails
      filteredEmails = originalEmails;
    } else {
      // Filter emails based on the search query
      filteredEmails = originalEmails.filter(email =>
        email.subject.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    // Update the emails state with filteredEmails
    setEmails(filteredEmails);
  }, [originalEmails, searchInput]);
  
  const handleInput = e => {
    setSearchInput(e.target.value);
  };

  const activeEmail = (userEmail) => {
    setSelectedEmail(userEmail);
  };

  return (
    <div className="App">
      <div className="inbox_trash">
        <h1 className='title'>Select</h1>
        <Deleted/> 
        <Inbox/>
      </div>
      <div className="sidebar">
        <h1 className='title'>Inbox</h1>
        <SearchBar
        placeholder='Search by Subject'
        handleInput={handleInput}
        />
        <SidebarView emails={emails} activeEmail={activeEmail} />
      </div>
      <div className='message'>
        <h1 className='title'>Message</h1>
        {selectedEmail && <BodyView selectedEmail={selectedEmail} />}
      </div>
    </div>
  );
}

export default App