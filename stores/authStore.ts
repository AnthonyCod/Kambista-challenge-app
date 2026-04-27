import { create } from 'zustand';
import { AuthState, User } from '@/types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setSession: (user: User, token: string) => {
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  clearSession: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
