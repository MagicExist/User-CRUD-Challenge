import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css'; // reutilizamos los estilos del registro

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
    <div className="app-container">
      {successVisible && (
        <div className="success-banner">
          ✅ Usuario agregado exitosamente. Redirigiendo...
        </div>
      )}

      <div className="login-wrapper">
        <div
          className="decoration-container"
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer' }}
        >
          <div className="decoration-content">
            <h3>Volver</h3>
            <p>Volver al panel de usuarios</p>
          </div>
        </div>

        <div className="login-container">
          <h2>Agregar Usuario</h2>
          <p>Completa los datos del nuevo usuario</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input name="surname" placeholder="Apellido" onChange={handleChange} value={formData.surname} />
              </div>
            </div>

            <div className='form-row'>
              <div className="form-group">
                <label>Edad</label>
                <input name="age" type="number" placeholder="Edad" onChange={handleChange} value={formData.age} />
              </div>
              <div className="form-group">
                <label>Correo electrónico</label>
                <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} value={formData.email} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contraseña</label>
                <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} />
              </div>
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <input name="password_confirmation" type="password" placeholder="Confirmar contraseña" onChange={handleChange} value={formData.password_confirmation} />
              </div>
            </div>

            <button type="submit">Agregar Usuario</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAdd;
