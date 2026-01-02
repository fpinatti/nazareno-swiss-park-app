import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
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

const SectionItem = ({ icon, label, value, isSwitch, switchValue, onSwitchChange, onPress, color = '#333' }: SectionItemProps) => (
  <TouchableOpacity 
    onPress={onPress} 
    activeOpacity={isSwitch ? 1 : 0.7}
    className="flex-row items-center py-4 border-b border-gray-100 dark:border-slate-700 last:border-0"
  >
    <View className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-700 items-center justify-center mr-4">
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View className="flex-1">
      <Text className="text-base font-medium text-slate-800 dark:text-slate-200">{label}</Text>
    </View>
    {value && (
      <Text className="text-slate-500 mr-2">{value}</Text>
    )}
    {isSwitch ? (
      <Switch 
        value={switchValue} 
        onValueChange={onSwitchChange}
        trackColor={{ false: '#e2e8f0', true: '#6366f1' }}
      />
    ) : (
      <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
    )}
  </TouchableOpacity>
);

export default function Settings() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [fontSize, setFontSize] = useState('Médio');

  const cycleFontSize = () => {
    if (fontSize === 'Pequeno') setFontSize('Médio');
    else if (fontSize === 'Médio') setFontSize('Grande');
    else setFontSize('Pequeno');
  };

  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center bg-white dark:bg-slate-800 z-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-800 dark:text-white">Configurações</Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        
        {/* Preferences Section */}
        <View className="mb-8">
          <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 ml-2">Preferências</Text>
          <View className="bg-white dark:bg-slate-800 rounded-3xl px-5 shadow-sm">
            <SectionItem 
              icon="moon-outline" 
              label="Modo Escuro" 
              isSwitch 
              switchValue={isDark}
              onSwitchChange={toggleColorScheme}
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

        <View className="items-center mt-6 mb-8">
          <Text className="text-slate-400 text-xs">Versão 1.0.0 (Build 124)</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
