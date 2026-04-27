import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const authStorage = {
  async saveSession(token: string, user: User): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },

  async clearSession(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  },

  async getStoredSession(): Promise<{ token: string; user: User } | null> {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userData = await SecureStore.getItemAsync(USER_KEY);
      
      if (token && userData) {
        return { token, user: JSON.parse(userData) as User };
      }
      return null;
    } catch {
      return null;
    }
  }
};
