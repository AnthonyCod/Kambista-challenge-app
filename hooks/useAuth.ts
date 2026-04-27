import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth/authService';
import { authStorage } from '@/services/auth/authStorage';
import { RegisterData } from '@/types';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSession = useAuthStore((state) => state.setSession);
  const clearStoreSession = useAuthStore((state) => state.clearSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await authService.login(email, password);
      await authStorage.saveSession(token, user);
      setSession(user, token);
      return true;
    } catch (err: any) {
      setError(err?.message || 'Error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, token } = await authService.register(data);
      await authStorage.saveSession(token, user);
      setSession(user, token);
      return true;
    } catch (err: any) {
      setError(err?.message || 'Error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authStorage.clearSession();
      clearStoreSession();
    } catch (err) {
      console.error('Error during logout', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  };
};
