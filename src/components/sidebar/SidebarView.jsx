import React from "react";
import './SidebarView.css';

const SidebarView = ({ emails, activeEmail, inboxView, deletedView }) => {
  let filteredEmails = emails;

  // Filter emails based on view (deleted or inbox)
  if (inboxView) {
    filteredEmails = emails.filter(email => !email.deleted);
  } else if (deletedView) {
    filteredEmails = emails.filter(email => email.deleted);
  }

  return (
    <div className="emailSidebar">
      {/* Loop all emails and display */}
      {filteredEmails.map(email => {
        // Sets appropriate class for email item
        let emailClasses = "emailSidebarItem";
        if (email.active) {
          emailClasses += " active";
        }
        if (email.read) {
          emailClasses += " unread";
        }else{
          emailClasses += " read";
        }

        return (
          <div className={emailClasses}
            key={email.id}
            onClick={() => activeEmail(email)}
          >
            <div className="emailFromSidebar">{email.from}</div>
            <div className="emailSubjectSidebar">{email.subject}</div>
            <div className="emailAddressSidebar">{email.address}</div>
            <div className="emailTime">{email.time}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarView;
