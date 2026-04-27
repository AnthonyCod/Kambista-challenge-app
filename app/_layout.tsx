import React, { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/stores/authStore';
import { authStorage } from '@/services/auth/authStorage';
import { queryClient } from '@/services/queryClient';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, setSession } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authStorage.getStoredSession();
        if (session) {
          setSession(session.user, session.token);
        }
      } catch (error) {
        console.error('Error restoring session:', error);
      } finally {
        setIsReady(true);
      }
    };

    initAuth();
  }, [setSession]);

  useEffect(() => {
    if (!isReady || !rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to app if authenticated and in auth group
      router.replace('/(app)');
    }
  }, [isAuthenticated, segments, isReady, rootNavigationState?.key]);

  if (!isReady) {
    return null; // Or a loading screen
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Slot />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
