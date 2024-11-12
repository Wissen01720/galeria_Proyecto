// AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log('Login called with userData:', userData); // Debug log
    setUser(userData);
  };

  const logout = () => {
    console.log('Logout called'); // Debug log
    setUser(null);
  };

  // Add a debug component to show current auth state
  const debugAuth = () => {
    console.log('Current user state:', user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, debugAuth }}>
      {children}
    </AuthContext.Provider>
  );
};