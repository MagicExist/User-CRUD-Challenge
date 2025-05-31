// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/Home';
import UserEdit from './components/User/UserEdit'; 
import UserAgg from './components/User/UserAdd'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirección automática */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userEdit/:id" element={<UserEdit />} /> 
        <Route path="/userAgg" element={<UserAgg />} /> 
        {/* Ruta para agregar un nuevo usuario */}
       
      </Routes>
    </Router>
  );
};

export default App;
