import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type FontSize = 'Pequeno' | 'Médio' | 'Grande';

interface PreferenceState {
  isDarkMode: boolean;
  fontSize: FontSize;
  _hasHydrated: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  setFontSize: (size: FontSize) => void;
  setHasHydrated: (state: boolean) => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      fontSize: 'Médio',
      _hasHydrated: false,
      setDarkMode: (value) => {
        set({ isDarkMode: value });
      },
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setFontSize: (size: FontSize) => set({ fontSize: size }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'preference-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
