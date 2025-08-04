import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getContactById, deleteContact } from '../services/ContactService';
import { logoutUser } from '../services/AuthService';
import styles from './ContactDetail.module.css';

function getInitials(name) {
  if (!name) return '';
  const parts = name.split(' ');
  return parts.map(p => p[0]).join('').toUpperCase();
}

function ContactDetail() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const data = await getContactById(id);
        setContact(data);
      } catch (err) {
        setError('Contact not found');
        console.error('Error fetching contact:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleDeleteContact = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        navigate('/Contacts');
      } catch (err) {
        console.error('Error deleting contact:', err);
      }
    }
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Contact Not Found</h2>
          <p>{error || 'The contact you are looking for does not exist.'}</p>
          <Link to="/Contacts" className={styles.backButton}>
            Back to Contacts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/Contacts" className={styles.backLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
          Back to Contacts
        </Link>
        <button className={styles.logoutButton} onClick={handleLogout} title="Logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16,17 21,12 16,7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>

      <div className={styles.contactCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>{getInitials(contact.name)}</div>
          <h1 className={styles.contactName}>{contact.name}</h1>
        </div>

        <div className={styles.contactDetails}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email
            </div>
            <div className={styles.detailValue}>{contact.email}</div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Phone
            </div>
            <div className={styles.detailValue}>{contact.phone}</div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to={`/Contacts/${id}/edit`} className={styles.editButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit Contact
          </Link>
          <button className={styles.deleteButton} onClick={handleDeleteContact}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactDetail; 