import { createContext, useContext, useState } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Exportar el hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// El componente que proporciona el contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulando un proceso de inicio de sesión
  const login = (userData) => {
    setUser(userData);
    console.log("User logged in:", userData);
  };

  const logout = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};