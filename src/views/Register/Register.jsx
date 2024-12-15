import React, { useState } from "react";
import { FaUser, FaLock, FaChevronDown, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_names: "",
    email: "",
    password: "",
    risk_profile: "",
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (formData.first_name.length < 4 || formData.last_names.length < 4) {
      return "El nombre y apellido debe tener al menos 4 caracteres";
    }
    if (!/^[a-zA-Z]+$/.test(formData.first_name) || !/^[a-zA-Z]+$/.test(formData.last_names)) {
      return "El nombre y apellido solo puede contener letras";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "El correo electrónico no es válido";
    }
    if (formData.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!formData.risk_profile) {
      return "El perfil de riesgo es obligatorio";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://34.44.169.14:8082/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error al registrar el usuario. Inténtalo de nuevo.");
      }

      // Registro exitoso
      setIsRegistered(true);
    } catch (err) {
      setError(err.message || "Error al intentar registrar.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsRegistered(false);
    navigate("/login");
  };

  return (
    <section className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Registrar</h1>
        <div className="input-register">
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-register">
          <input
            type="text"
            id="last_names"
            name="last_names"
            value={formData.last_names}
            onChange={handleChange}
            placeholder="Apellido"
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
            placeholder="Correo Electrónico"
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
          <span className="toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="input-register">
          <select
            id="risk_profile"
            name="risk_profile"
            value={formData.risk_profile}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecciona tu perfil de riesgo
            </option>
            <option value="1">Conservative</option>
            <option value="2">Moderate</option>
            <option value="3">Risky</option>
          </select>
          <FaChevronDown className="icon" />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
        {error && <p className="error-message-r">{error}</p>}
        <p className="create-link-r primary-color">
          ¿Ya tienes cuenta?
          <Link to="/login" style={{ marginLeft: "10px", fontSize: "1.6rem" }}>
            Iniciar sesión
          </Link>
        </p>
      </form>

      {isRegistered && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Registro exitoso</h2>
            <p>Tu cuenta ha sido creada correctamente. ¡Bienvenido!</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;
