import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ChurchMap() {
  return (
    <View className="items-center p-4">
      <Ionicons name="map-outline" size={40} color="#4b5563" />
      <Text className="text-gray-600 text-center mt-2 font-medium">
        Mapa disponível no aplicativo móvel
      </Text>
      <TouchableOpacity 
        onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=-22.97872,-47.07052')}
        className="mt-2"
      >
        <Text className="text-blue-600 font-bold">Ver no Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
}
