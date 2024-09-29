import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    if (token) {
      setAccessToken(token);
    }
    if (role) {
      setUserRole(role);
    }
    if (name) {
      setUserName(name);
    }
  }, []);

  const login = (userName, userRole, token) => {
    setUserName(userName);
    setUserRole(userRole);
    setAccessToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('name', userName);
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setUserRole(null);
    setAccessToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    userName,
    userRole,
    accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
