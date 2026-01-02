import { usePreferenceStore } from '@/store/usePreferenceStore';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useEffect } from 'react';

export function useColorScheme() {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const { isDarkMode, setDarkMode, _hasHydrated } = usePreferenceStore();

  useEffect(() => {
    if (_hasHydrated) {
      const targetScheme = isDarkMode ? 'dark' : 'light';
      setColorScheme(targetScheme);
      
      // On web, NativeWind sometimes needs help syncing the 'dark' class to the document element
      if (typeof document !== 'undefined') {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, [isDarkMode, setColorScheme, _hasHydrated]);

  return {
    colorScheme: isDarkMode ? 'dark' : 'light',
    toggleColorScheme: (value: boolean) => setDarkMode(value),
    isDark: isDarkMode,
    hasHydrated: _hasHydrated,
  };
}
