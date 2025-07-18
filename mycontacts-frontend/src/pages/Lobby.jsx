import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Lobby.module.css';

function Lobby() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contact Manager</h1>
            <p className={styles.subtitle}>Manage your contacts with ease and security</p>
            
            <div className={styles.buttonContainer}>
                <button 
                    className={`${styles.lobbyButton} ${styles.loginButton}`} 
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
                <button 
                    className={`${styles.lobbyButton} ${styles.registerButton}`} 
                    onClick={() => navigate("/Register")}
                >
                    Register
                </button>
            </div>
            
            <div className={styles.footer}>
                <p>© 2024 Contact Manager. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Lobby;

