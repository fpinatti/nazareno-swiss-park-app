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
        // Force the class on the html element with a slight delay to ensure it overrides defaults
        setTimeout(() => {
          if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
          } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
          }
        }, 0);
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
