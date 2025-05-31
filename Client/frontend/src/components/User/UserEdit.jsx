import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/UserEdit.css';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    age: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (response.ok) {
          setUser(prev => ({
            ...prev,
            name: data.name,
            surname: data.surname,
            email: data.email,
            age: data.age
          }));
        } else {
          setError(data.message || 'Error al obtener el usuario.');
        }
      } catch (err) {
        setError('Error de red al obtener el usuario.');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updatedUser = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      age: user.age,
      
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        navigate('/home');
      } else {
        let data;
        try {
          data = await response.json();
          setError(data.message || 'Error al actualizar usuario.');
        } catch (err) {
          setError('Error desconocido del servidor.');
        }
      }
    } catch (err) {
      setError('Error de red al actualizar usuario.');
    }
  };

  return (
    <div className="user-edit-wrapper">
      <button 
        className="btn-volver" 
        onClick={() => navigate('/home')}
      >
        Volver
      </button> 

      <div className="edit-user-container">
        <h2>Editar Usuario</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="edit-form">
          <label>
            Nombre:
            <input type="text" name="name" value={user.name} onChange={handleChange} required />
          </label>
          <label>
            Apellido:
            <input type="text" name="surname" value={user.surname} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} required />
          </label>
          <label>
            Edad:
            <input type="number" name="age" value={user.age} onChange={handleChange} required />
          </label>
          <div className="form-buttons">
            <button type="submit">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;

