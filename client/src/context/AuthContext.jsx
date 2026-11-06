import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('agy_adm_tkn') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.checkAuth(token);
        if (res.success && res.admin) {
          setAdmin(res.admin);
        } else {
          setAdmin(null);
          setToken('');
          localStorage.removeItem('agy_adm_tkn');
        }
      } catch (err) {
        setAdmin(null);
        setToken('');
        localStorage.removeItem('agy_adm_tkn');
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, [token]);

  const login = async (username, password) => {
    const res = await api.login(username, password);
    if (res.success) {
      setAdmin(res.admin);
      setToken(res.token);
      localStorage.setItem('agy_adm_tkn', res.token);
    }
    return res;
  };

  const changePassword = async (currentPassword, newPassword) => {
    const res = await api.changePassword(currentPassword, newPassword, token);
    if (res.success) {
      setAdmin(prev => ({ ...prev, requirePasswordChange: false }));
    }
    return res;
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // Ignore
    }
    setAdmin(null);
    setToken('');
    localStorage.removeItem('agy_adm_tkn');
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, changePassword, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

