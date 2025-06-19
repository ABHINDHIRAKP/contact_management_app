import React from "react";
import { useNavigate } from "react-router-dom";

function Lobby() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick = {() => navigate("/login")}>
                Login
            </button>
            <button onClick = {() => navigate("/Register")}>
                Register
            </button>
        </div>
    )
}

export default Lobby;

