import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://mocki.io/v1/63693984-26bf-4687-90e7-a45c3ab2852e"
      );

      if (!response.ok) {
        setError("No existe el usuario");
      }

      const user = await response.json();

      if (user.email === email && user.password === password) {
        alert("Entraste mamawebo");
        navigate("/home");
      } else {
        setError("Email or Password incorrect");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <FaLock className="icon" />
        </div>

        <button type="submit">Iniciar Sesion</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
