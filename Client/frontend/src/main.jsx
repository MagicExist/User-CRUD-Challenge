// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Cambia esto a la ruta correcta de tu componente App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
