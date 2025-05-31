import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/UserAdd.css';

const UserAdd = () => {
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
  const [successVisible, setSuccessVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessVisible(false);

    if (formData.password !== formData.password_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessVisible(true);
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        const msg = data.message || 'Error al agregar usuario. Verifica los datos.';
        setError(msg);
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="user-add-wrapper">
      {successVisible && (
        <div className="success-banner">
          Usuario agregado exitosamente. Redirigiendo...
        </div>
      )}

      <button className="btn-volver" onClick={() => navigate('/home')}>Volver</button>

      <div className="user-add-container">
        <h2>Agregar Usuario</h2>
        <p>Completa los datos del nuevo usuario</p>

        {error && <div className="error">{error}</div>}

        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" />
          </label>
          <label>
            Apellido
            <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Apellido" />
          </label>
          <label>
            Edad
            <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Edad" />
          </label>
          <label>
            Correo electrónico
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" />
          </label>
          <label>
            Contraseña
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" />
          </label>
          <label>
            Confirmar contraseña
            <input name="password_confirmation" type="password" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirmar contraseña" />
          </label>

          <div className="form-buttons">
            <button type="submit">Agregar Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAdd;
