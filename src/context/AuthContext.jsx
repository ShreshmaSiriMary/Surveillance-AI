import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [themeColor, setThemeColor] = useState('cyan');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api('/auth/me').then(data => setUser(data.user)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);
  const loginWithEmail = async (email, password) => {
    setAuthError('');
    try { const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); setUser(data.user); return true; }
    catch (error) { setAuthError(error.message); return false; }
  };
  const registerNewCitizen = async ({ name, email, password, phone }) => {
    setAuthError('');
    try { const data = await api('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, phone }) }); setUser(data.user); return true; }
    catch (error) { setAuthError(error.message); return false; }
  };
  const logout = () => setShowLogoutConfirm(true);
  const confirmLogout = async () => {
    try { await api('/auth/logout', { method: 'POST', body: '{}' }); setUser(null); setAuthError(''); setShowLogoutConfirm(false); }
    catch (error) { setAuthError(error.message); }
  };
  const value = useMemo(() => ({ user, setUser, loading, loginWithEmail, registerNewCitizen, logout, confirmLogout, showLogoutConfirm, setShowLogoutConfirm, authError, setAuthError, themeColor, setThemeColor, notifications, setNotifications }), [user, loading, authError, showLogoutConfirm, notifications, themeColor]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }
