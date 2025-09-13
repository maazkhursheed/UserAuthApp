import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDB, saveUserDB } from '../storage/storage';

export type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_USER_KEY = 'AUTH_USER_V1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const val = await AsyncStorage.getItem(AUTH_USER_KEY);
        if (val) setUser(JSON.parse(val));
      } catch (e) {
        console.warn('Failed to load user', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const users = await getUserDB();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!found) return { ok: false, error: 'Incorrect credentials' };

      setUser(found);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(found));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const users = await getUserDB();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { ok: false, error: 'Email already used' };
      }
      const newUser: User = { name, email, password };
      users.push(newUser);
      await saveUserDB(users);
      setUser(newUser);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Signup failed' };
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {
      // ignore
    }
  };

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};