import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Lobby.module.css';

function Lobby() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <button className={styles.lobbyButton} onClick = {() => navigate("/login")}>
                Login
            </button>
            <button className={styles.lobbyButton} onClick = {() => navigate("/Register")}>
                Register
            </button>
        </div>
    )
}

export default Lobby;

