import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Obtener usuario y token del localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    if (!token) {
      // Si no hay token, redirigir al login
      navigate('/login');
    } else {
      setUsername(user || 'Usuario');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <h1>Bienvenido usuario: {username}</h1>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;
