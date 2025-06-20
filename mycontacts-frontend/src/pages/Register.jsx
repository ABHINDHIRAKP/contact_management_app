import React, {useState} from 'react';
import { registerUser } from '../services/AuthService'
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await registerUser(form);
            setForm({
                name: '',
                email: '',
                password: ''
            });
            alert("Registration Successfull");
            navigate('/');
            setLoading(false);
        }
        catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };
  
    return (
        <div className={styles.container}>
        <h2 className={styles.title}>Register</h2>
        <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input 
                    type="text" 
                    name="name"  
                    placeholder="Name" 
                    value = {form.name}
                    className={styles.input}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value = {form.email}
                    className={styles.input}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                />
            </div>

            <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value = {form.password}
                className={styles.input}
                onChange={(e) => setForm({...form, password: e.target.value})}
            />
            </div>

            <button className={styles.registerButton} type="submit" disabled={loading}>Register</button>
        </form>
        </div>
    );
    }

export default Register;
