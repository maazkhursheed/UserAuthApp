import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser, saveUser, clearUser, getUsers, saveUsers } from '../storage/storage';

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

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const u = await getUser();
      if (u) setUser(u);
      setLoading(false);
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    const users = await getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { ok: false, error: 'Invalid credentials' };
    }
    await saveUser(found);
    setUser(found);
    return { ok: true };
  };

  const signup = async (name: string, email: string, password: string) => {
    const users = await getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { ok: false, error: 'Email already exists' };
    }
    const newUser: User = { name, email, password };
    users.push(newUser);
    await saveUsers(users);
    await saveUser(newUser);
    setUser(newUser);
    return { ok: true };
  };

  const logout = async () => {
    await clearUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);