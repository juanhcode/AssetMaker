import React, { useState } from "react";
import "./Register.css"
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            setError("Las contraseñas no coinciden");
            return;
        }
        console.log(formData);
    };

    return (
        <section className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h1>Registrar</h1>
                <div className="input-register">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre"
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
                        placeholder="Correo Electronico"
                        required
                    />
                    <MdEmail className="icon" />
                </div>
                <div className="input-register">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                    />
                    <FaLock className="icon" />
                    <span className="toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="input-register">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmar Contraseña"
                        required
                    />
                    <FaLock className="icon" />
                    <span className="toggle-visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button type="submit">Registrar</button>
                {error && <p className="error-message-r">{error}</p>}
                <p className="create-link-r primary-color">¿Ya tienes cuenta?<Link to="/login" style={{ marginLeft: "10px", fontSize: "1.6rem" }}>Iniciar sesion</Link></p>
            </form>
        </section>
    );
};

export default Register;