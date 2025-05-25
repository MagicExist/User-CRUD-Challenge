import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          device_name: 'react_frontend'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Guarda el token
      setSuccess('Inicio de sesión exitoso.');
      navigate('/home'); // Redirige a Home.jsx

    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="login-wrapper">
        <div className="login-container">
          <h2>Bienvenido</h2>
          <p>Ingresa tus credenciales.</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Iniciar sesión</button>
          </form>

          <div className="status-bar">
            <span>¿Olvidaste tu contraseña?</span>
          </div>
        </div>

        <div
          className="decoration-container"
          onClick={() => navigate('/register')}
          style={{ cursor: 'pointer' }}
        >
          <div className="decoration-content">
            <h3>Registrarse</h3>
            <p>¿No tienes una cuenta?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
