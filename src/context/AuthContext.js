import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { hashPassword, getStoredUser, storeUser, setSession, getSession, clearSession } from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    const stored = getStoredUser();
    if (session && stored && session.username === stored.username) {
      setUser({ username: stored.username });
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username, password) => {
    const stored = getStoredUser();
    if (!stored || stored.username !== username) {
      throw new Error('Usuario no encontrado');
    }
    const hash = await hashPassword(password);
    if (hash !== stored.passwordHash) {
      throw new Error('Contraseña incorrecta');
    }
    setUser({ username: stored.username });
    setSession(username);
  }, []);

  const register = useCallback(async (username, password) => {
    if (getStoredUser()) {
      throw new Error('Ya existe una cuenta registrada');
    }
    const hash = await hashPassword(password);
    storeUser(username, hash);
    setUser({ username });
    setSession(username);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
