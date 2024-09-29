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
    //   // const token = localStorage.getItem('token');
    //   // if (token) {
    //   //   setAccessToken(token);
    //   // }
    //   if (!accessToken) {
    //     // console.log(window.location.host);
    //   }
  }, []);

  const login = (userName, userRole, token) => {
    setUserName(userName);
    setUserRole(userRole);
    setAccessToken(token);
    localStorage.setItem('token', token);
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
