import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact } from '../services/ContactService';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ContactList.module.css';

function getInitials(name) {
  if (!name) return '';
  const parts = name.split(' ');
  return parts.map(p => p[0]).join('').toUpperCase();
}

function ContactList({deleteContactHandler}) {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const handleDeleteContact = async(id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await deleteContactHandler(id);
      setContacts(contacts.filter(c => c._id !== id));
    }

  }

  useEffect(() => {
    const fetch = async () => {
      const data = await getContacts();
      setContacts(data);
    };
    fetch();
  }, []);

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.title}>Your Contacts</h2>
      <div className={styles.list}>
        {contacts.map((c) => (
          <div key={c._id} className={styles.contactRow}>
            <div className={styles.avatar}>{getInitials(c.name)}</div>
            <div className={styles.contactInfo}>
              <div className={styles.contactName}>{c.name}</div>
              <div className={styles.contactDetails}>{c.email} | {c.phone}</div>
            </div>
            <div className={styles.contactActions}>
              <button
                className={styles.deleteButton}
                title="Delete Contact"
                onClick={() => handleDeleteContact(c._id)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to='/Contacts/add' className={styles.fabLink}>
        <button className={styles.fab} title="Add Contact">+</button>
      </Link>
    </div>
  );
}

export default ContactList;