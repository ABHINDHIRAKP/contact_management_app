import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/ContactService';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getContacts();
      setContacts(data);
    };
    fetch();
  }, []);

  return (
    <div className="ui container">
      <h2>Your Contacts</h2>
      <div className="ui celled list">
        {contacts.map((c) => (
          <div key={c._id} className="item">
            <div className="content">
              <div className="header">{c.name}</div>
              {c.email} | {c.phone}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactList;