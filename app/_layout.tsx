import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Sentry initialization
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DNS,
  debug: false, // Set this to true to see Sentry messages in console
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync(Ionicons.font);
      } catch (e) {
        // Log font loading error to Sentry
        Sentry.captureException(e);
        console.warn(e);
      } finally {
        setLoaded(true);
        await SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <View className={colorScheme === 'dark' ? 'dark' : ''} style={{ flex: 1 }} key={colorScheme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal' }}
          />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </View>
  );
}

export default Sentry.wrap(RootLayout);
