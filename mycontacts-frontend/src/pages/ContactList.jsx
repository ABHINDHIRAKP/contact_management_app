import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/ContactService';
import {Link} from 'react-router-dom';

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
      <h2>
        Contact List
        <Link to = '/Contacts/add'>
            <button className = "ui button blue right">Add Contact</button>                    
        </Link>
      </h2>
    </div>
  );
}

export default ContactList;