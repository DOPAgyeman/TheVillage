// Import  global CSS file
import '../../global.css';

import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/clerk-expo';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useNavigationContainerRef } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme } from '@/core';
import { useNetworkInfo } from '@/core/use-network-info';
import { useThemeConfig } from '@/core/use-theme-config';
import { View } from '@/ui';

import { getItem, removeItem, setItem } from '../core/storage';

const tokenCache = {
  async getToken<T>(key: string) {
    return getItem<T>(key);
  },
  async saveToken<T>(key: string, value: T) {
    return setItem(key, value);
  },
  async clearToken(key: string) {
    return removeItem(key);
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useFonts({
    FontAwesome: FontAwesome.font,
    FontAwesome6: FontAwesome6.font,
    Ionicons: Ionicons.font,
  });
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen
          name="get-started"
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
        />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  useNetworkInfo();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <ThemeProvider value={theme}>
        <APIProvider>
          <BottomSheetModalProvider>
            <ClerkProvider
              tokenCache={tokenCache}
              publishableKey={publishableKey}
            >
              <ClerkLoading>
                <View className="flex h-full items-center justify-center">
                  <ActivityIndicator
                    size="large"
                    className="h-20 w-20  text-black dark:text-white"
                  />
                </View>
              </ClerkLoading>
              <ClerkLoaded>{children}</ClerkLoaded>
            </ClerkProvider>

            <FlashMessage />
          </BottomSheetModalProvider>
        </APIProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
