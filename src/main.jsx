import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Asegúrate de que la ruta sea correcta

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* Envolvemos la app con el AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);