import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ChurchMap() {
  return (
    <View className="items-center p-4">
      <Ionicons name="map-outline" size={40} color="#4b5563" />
      <Text className="mt-2 text-center font-medium text-gray-600">
        Mapa disponível no aplicativo móvel
      </Text>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://www.google.com/maps/search/?api=1&query=-22.97872,-47.07052',
          )
        }
        className="mt-2"
      >
        <Text className="font-bold text-blue-600">Ver no Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
}
