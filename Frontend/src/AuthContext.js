import React, { createContext, useContext, useState } from 'react';
// import { routes } from "./routes";
import AllRoute from './components/AllRoute';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    const token = localStorage.getItem('tokens');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <AllRoute />
    </AuthContext.Provider>
  );
}
