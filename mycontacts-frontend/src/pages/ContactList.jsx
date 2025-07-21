import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/ContactService';
import {Link} from 'react-router-dom';
import styles from './ContactList.module.css';

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
    <div className={styles.container}>
      <h2 className={styles.title}>Your Contacts</h2>
      <div className={styles.list}>
        {contacts.map((c) => (
          <div key={c._id} className={styles.item}>
            <div className={styles.content}>
              <div className={styles.header}>{c.name}</div>
              <div className={styles.details}>{c.email} | {c.phone}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.addButtonContainer}>
        <Link to='/Contacts/add'>
          <button className={styles.addButton}>Add Contact</button>
        </Link>
      </div>
    </div>
  );
}

export default ContactList;