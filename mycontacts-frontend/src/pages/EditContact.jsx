import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddContacts.module.css';
import ContactService from '../services/ContactService';

function EditContact() {
    const [person, setPerson] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch contact by ID and prefill form
        ContactService.getContactById(id)
            .then((data) => {
                setPerson({
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || ''
                });
            })
            .catch((err) => {
                alert('Failed to fetch contact');
                navigate('/Contacts');
            });
    }, [id, navigate]);

    const update = (e) => {
        e.preventDefault();
        if(person.name === '' || person.email === '' || person.phone === '') {
            alert('All the fields are mandatory!');
            return;
        }
        ContactService.updateContact(id, person)
            .then(() => {
                navigate('/Contacts');
            })
            .catch(() => {
                alert('Failed to update contact');
            });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Edit Contact</h2>
            <form className={styles.form} onSubmit={update}>
                <div className={styles.field}>
                    <label className={styles.label}>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={person.name}
                        onChange={(e) => setPerson({...person, name: e.target.value})}
                        className={styles.input}
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        value={person.email}
                        onChange={(e) => setPerson({...person, email: e.target.value})}
                        className={styles.input}
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Phone</label>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="Phone"
                        value={person.phone}
                        onChange={(e) => setPerson({...person, phone: e.target.value})}
                        className={styles.input}
                    />
                </div>
                <button className={styles.addButton}>Update</button>
            </form>
        </div>
    );
}

export default EditContact;