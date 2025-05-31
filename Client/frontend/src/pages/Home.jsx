import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('user_email');

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de autenticación. Por favor inicia sesión.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Error al obtener usuarios.');
      } else {
        setUsers(data);
      }
    } catch (err) {
      setError('Error de red al obtener usuarios.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        const data = await response.json();
        alert(data.message || 'Error al eliminar usuario.');
      }
    } catch (err) {
      alert('Error de red al eliminar usuario.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/userEdit/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    navigate('/login');
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebar-left">
          <h2>Admin Panel</h2>
          <p style={{ color: 'white' }}>Bienvenido, {userEmail}</p>
        </div>
        <div className="sidebar-right">
          <button className="add-user-btn" onClick={() => navigate('/userAgg')}>Agregar Usuario</button>
          <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      <div className="main">
        <h2>Lista de Usuarios</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name} {user.surname}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td className="actions">
                  <button className="edit" onClick={() => handleEdit(user.id)}>Editar</button>
                  <button className="delete" onClick={() => handleDelete(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
