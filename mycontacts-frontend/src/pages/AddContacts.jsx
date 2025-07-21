import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddContacts.module.css';

function AddContacts({addContactHandler}) {
    const [person, setPerson] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault();
        if(person.name === "" || person.email === "" || person.phone === "") {
            alert("All the fields are mandatory!");
            return;
        }
        addContactHandler(person);
        setPerson({name:'', email:'', phone:''});
        navigate('/Contacts');
    };
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add Contact</h2>
            <form className={styles.form} onSubmit={add}>
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
                        value = {person.email}
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
                        value = {person.phone}
                        onChange={(e) => setPerson({...person, phone: e.target.value})}
                        className={styles.input}
                    />
                </div>
                <button className={styles.addButton}>Add</button>
            </form>
        </div>
    )

}
export default AddContacts;

