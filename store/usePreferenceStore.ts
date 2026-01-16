import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type FontSize = 'Pequeno' | 'Médio' | 'Grande';

interface PreferenceState {
  isDarkMode: boolean;
  fontSize: FontSize;
  bibleVersion: string;
  bibleBookAbbrev: string;
  bibleChapter: number;
  _hasHydrated: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  setFontSize: (size: FontSize) => void;
  setHasHydrated: (state: boolean) => void;
  setBibleVersion: (version: string) => void;
  setBibleBook: (abbrev: string) => void;
  setBibleChapter: (chapter: number) => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      isDarkMode: Appearance.getColorScheme() === 'dark',
      fontSize: 'Médio',
      bibleVersion: 'nvi',
      bibleBookAbbrev: 'gn',
      bibleChapter: 1,
      _hasHydrated: false,
      setDarkMode: (value) => {
        set({ isDarkMode: value });
      },
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setFontSize: (size: FontSize) => set({ fontSize: size }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setBibleVersion: (version) => set({ bibleVersion: version }),
      setBibleBook: (abbrev) => set({ bibleBookAbbrev: abbrev }),
      setBibleChapter: (chapter) => set({ bibleChapter: chapter }),
    }),
    {
      name: 'preference-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
