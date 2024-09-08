import React, { useState } from "react";
import "./Register.css"
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        console.log(formData);
    };

    return (
        <section className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h1>Register</h1>
                <div className="input-register">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-register">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <MdEmail className="icon"/>
                </div>
                <div className="input-register">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <FaLock className="icon" />
                </div>
                <div className="input-register">
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                    <FaLock className="icon" />
                </div>
                <button type="submit">Registrar</button>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                <p className="create-link primary-color">¿Ya tienes cuenta?<Link to="/login" style={{ marginLeft: "10px" }}>Iniciar sesion</Link></p>
            </form>
        </section>
    );
};

export default Register;