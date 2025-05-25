import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.password_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Guarda el token si lo devuelve
        setSuccess('Registro exitoso');
        navigate('/home'); // Redirige al Home.jsx
      } else {
        const msg = data.message || 'Error al registrar. Verifica los datos.';
        setError(msg);
        console.error("Errores:", data);
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="app-container">
      <div className="login-wrapper">
        <div
          className="decoration-container"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <div className="decoration-content">
            <h3>Login</h3>
            <p>¿Ya tienes una cuenta?</p>
          </div>
        </div>

        <div className="login-container">
          <h2>Registro</h2>
          <p>Crea tu cuenta</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input name="surname" placeholder="Apellido" onChange={handleChange} value={formData.surname} />
            </div>
            <div className="form-group">
              <label>Edad</label>
              <input name="age" type="number" placeholder="Edad" onChange={handleChange} value={formData.age} />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} value={formData.email} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} />
            </div>
            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input name="password_confirmation" type="password" placeholder="Confirmar contraseña" onChange={handleChange} value={formData.password_confirmation} />
            </div>

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
