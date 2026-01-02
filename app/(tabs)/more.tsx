import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MoreScreen() {
  const router = useRouter();

const menuItems = [
    { label: 'Bíblia', icon: 'book-outline', route: '/bible' },
    { label: 'Dízimos e Ofertas', icon: 'heart-outline', route: '/giving' },
    { label: 'Ministérios', icon: 'people-outline', route: '/ministries' },
    { label: 'Pedidos de Oração', icon: 'chatbox-ellipses-outline', route: '/prayer-request' },
    { label: 'Configurações', icon: 'settings-outline', route: '/settings' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 py-3 border-b border-gray-800">
         <Text className="text-white text-xl font-bold">Mais</Text>
      </View>
      <ScrollView contentContainerClassName="p-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            className="flex-row items-center bg-gray-900 p-4 rounded-lg mb-3"
            onPress={() => item.route && router.push(item.route as any)}
          >
            <Ionicons name={item.icon as any} size={24} color="#3b82f6" />
            <Text className="text-white text-lg ml-4 font-semibold">{item.label}</Text>
            <View className="flex-1" />
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
