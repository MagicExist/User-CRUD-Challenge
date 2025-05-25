// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';     // Renombrado para claridad
import Register from './components/Auth/Register';
import Home from './pages/Home'; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />         {/* Login por defecto */}
        <Route path="/register" element={<Register />} /> {/* Register al navegar */}
        <Route path="/home" element={<Home />} />       {/* Home después de login exitoso */}
      </Routes>
    </Router>
  );
};

export default App;
