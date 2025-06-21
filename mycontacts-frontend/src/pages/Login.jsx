import React, {useState} from 'react';
import styles from './Login.module.css';
import { loginUser } from '../services/AuthService'
import { useNavigate } from "react-router-dom";

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginUser(form);
            if(res.data?.accessToken){
                const accessToken = res.data.accessToken;
                console.log(accessToken);
                localStorage.setItem("accessToken", accessToken);
                setForm({
                    email: '',
                    password: ''
                });
                alert("Login Successfull");
                navigate('/Contacts');
            }
            else {
                throw new Error("Login Failed");
            }
        }
        catch (err) {
            alert(err.response?.data?.message||"Login Failed");
        }
        finally {
            setLoading(false);
        }

    };
  
    return (
        <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>

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

            <button className={styles.loginButton} type="submit" disabled={loading}>Login</button>
        </form>
        </div>
    );
    }

export default Login;
