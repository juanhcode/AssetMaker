import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { ENDPOINTS } from "config";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error en la solicitud");
        return;
      }

      const user = await response.json();
      localStorage.setItem("token", user.token);
      // Si el inicio de sesión es exitoso, redirigir al dashboard
      if (user.email === email) {
        navigate("/dashboard");
      } else {
        setError("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Iniciar Sesión</h1>
        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electronico"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <span className="icon" onClick={handleTogglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit">Iniciar Sesion</button>
        {error && <p className="error-message-i">{error}</p>}
        <p className="create-link-i primary-color">
          ¿No tienes cuenta?
          <Link to="/register" style={{ marginLeft: "10px", fontSize: "1.6rem" }}>
            Crear cuenta
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
