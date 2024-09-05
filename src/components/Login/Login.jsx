import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            alert('¡Acceso concedido!');
            navigate("/home");
        } else {
            alert("Correo electrónico o contraseña inválidos.");
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <FaLock className="icon"/>
                </div>
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
    );
}

export default Login;