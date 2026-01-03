import { FontSize, usePreferenceStore } from '@/store/usePreferenceStore';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SectionItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (val: boolean) => void;
  onPress?: () => void;
  color?: string;
};

const SectionItem = ({
  icon,
  label,
  value,
  isSwitch,
  switchValue,
  onSwitchChange,
  onPress,
  color = '#333',
}: SectionItemProps) => {
  const handlePress = () => {
    if (isSwitch && onSwitchChange) {
      onSwitchChange(!switchValue);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={isSwitch ? 0.7 : 0.7}
      className="flex-row items-center border-b border-gray-100 py-4 last:border-0 dark:border-slate-700"
    >
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-700">
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-slate-800 dark:text-slate-200">
          {label}
        </Text>
      </View>
      {value && <Text className="mr-2 text-slate-500">{value}</Text>}
      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#e2e8f0', true: '#6366f1' }}
          // On web, sometimes clicks propagate strangely, so we ensure the switch is responsive
          disabled={false}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
      )}
    </TouchableOpacity>
  );
};

export default function Settings() {
  const router = useRouter();
  const { fontSize, setFontSize, isDarkMode, setDarkMode } =
    usePreferenceStore();
  const isDark = isDarkMode;

  const handleToggle = (value: boolean) => {
    setDarkMode(value);
  };

  const cycleFontSize = () => {
    const sizes: FontSize[] = ['Pequeno', 'Médio', 'Grande'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View className="z-10 flex-row items-center bg-white px-6 py-4 dark:bg-slate-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? '#fff' : '#1e293b'}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-800 dark:text-white">
          Configurações
        </Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {/* Preferences Section */}
        <View className="mb-8">
          <Text className="mb-4 ml-2 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Preferências
          </Text>
          <View className="rounded-3xl bg-white px-5 shadow-sm dark:bg-slate-800">
            <SectionItem
              icon="moon-outline"
              label="Modo Escuro"
              isSwitch
              switchValue={isDarkMode}
              onSwitchChange={handleToggle}
              color="#6366f1"
            />
            <SectionItem
              icon="text-outline"
              label="Tamanho da Fonte"
              value={fontSize}
              onPress={cycleFontSize}
              color="#10B981"
            />
          </View>
        </View>

        <View className="mb-8 mt-6 items-center">
          <Text className="text-xs text-slate-400">
            Versão {Constants.expoConfig?.version || '1.0.0'} (Build{' '}
            {Constants.expoConfig?.ios?.buildNumber ||
              Constants.expoConfig?.android?.versionCode ||
              '1'}
            )
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
