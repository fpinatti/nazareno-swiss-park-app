import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function MoreScreen() {
  const router = useRouter();
  const isDark = usePreferenceStore((state) => state.isDarkMode);

  const menuItems = [
    { label: 'Bíblia', icon: 'book-outline', route: '/bible' },
    { label: 'Dízimos e Ofertas', icon: 'heart-outline', route: '/giving' },
    { label: 'Ministérios', icon: 'people-outline', route: '/ministries' },
    { label: 'Kids', icon: 'happy-outline', route: '/kids' },
    {
      label: 'Pedidos de Oração',
      icon: 'chatbox-ellipses-outline',
      route: '/prayer-request',
    },
    { label: 'Configurações', icon: 'settings-outline', route: '/settings' },
  ];

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? 'dark bg-slate-800' : 'bg-white'}`}
    >

      <View className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">
          Mais
        </Text>
      </View>
      <ScrollView contentContainerClassName="p-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="mb-3 flex-row items-center rounded-xl border border-gray-100 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-900"
            onPress={() => item.route && router.push(item.route as any)}
          >
            <Ionicons name={item.icon as any} size={24} color="#3b82f6" />
            <Text className="ml-4 text-lg font-semibold text-slate-900 dark:text-white">
              {item.label}
            </Text>
            <View className="flex-1" />
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
