import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../context/AuthContext';

const USERS_KEY = 'AUTH_USERS_DB_V1';

export const getUserDB = async (): Promise<User[]> => {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveUserDB = async (users: User[]): Promise<void> => {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};