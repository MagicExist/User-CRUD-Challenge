// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';     // Renombrado para claridad
import Register from './components/Auth/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />         {/* Login por defecto */}
        <Route path="/register" element={<Register />} /> {/* Register al navegar */}
      </Routes>
    </Router>
  );
};

export default App;
