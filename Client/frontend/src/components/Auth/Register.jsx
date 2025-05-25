import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css'; // Usa el mismo CSS

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Aquí enviarías los datos al backend
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="app-container">
      <div className="login-wrapper">
        
        {/* Bloque azul a la izquierda */}
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

        {/* Formulario a la derecha */}
        <div className="login-container">
          <h2>Register</h2>
          <p>Create your account</p>

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
