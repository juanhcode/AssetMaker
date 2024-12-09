import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const URL = process.env.REACT_APP_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //print("hola");
    e.preventDefault();
    setError(null);
    try {
      //http://34.45.127.11:8082/rest/auth/login
      const response = await fetch("http://34.44.169.14:8082/rest/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      console.log("Login", response.data);

      if (!response.ok) {
        setError("No existe el usuario");
      }

      const user = await response.json();

      // Si el inicio de sesión es exitoso, redirigir al dashboard
      if (user.email === email && user.password === password) {
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
