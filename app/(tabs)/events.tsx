import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function EventsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 py-3 border-b border-gray-800">
         <Text className="text-white text-xl font-bold">Eventos</Text>
      </View>
      <ScrollView contentContainerClassName="p-4">
        {[1, 2, 3].map((i) => (
          <View key={i} className="bg-white rounded-lg overflow-hidden mb-4">
            <View className="h-32 bg-gray-300" />
            <View className="p-4">
              <Text className="text-xl font-bold text-black mb-2">Cultos</Text>
              
              <View className="flex-row items-center mb-1">
                 <Ionicons name="calendar-outline" size={16} color="black" />
                 <Text className="ml-2 text-black">Todos os domingos</Text>
              </View>
              <View className="flex-row items-center mb-1">
                 <Ionicons name="time-outline" size={16} color="black" />
                 <Text className="ml-2 text-black">10 e 19:30h</Text>
              </View>
              <View className="flex-row items-center mb-2">
                 <Ionicons name="location-outline" size={16} color="black" />
                 <Text className="ml-2 text-black">Templo principal</Text>
              </View>

              <Text className="text-sm text-gray-800">
                Join us for a time of worship and teaching. Coffee and fellowship before service starts.
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
