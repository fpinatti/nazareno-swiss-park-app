import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView contentContainerClassName="p-4">
        <Text className="text-white text-2xl font-bold mb-4">Bem vindo a Igreja do Nazareno Swiss Park</Text>
        <Text className="text-gray-300 text-base mb-6">
          We are a community of believers passionate about loving God and loving people. Our mission is to create a welcoming environment where everyone can experience the transformational love of Jesus Christ.
        </Text>
        {/* Placeholder for video */}
        <View className="w-full h-48 bg-gray-800 rounded-lg mb-6" />

        <Text className="text-white text-xl font-bold mb-3">Nossos valores:</Text>
        
        <View className="bg-white rounded-lg p-4 mb-3">
          <Text className="text-blue-900 font-bold text-lg">Authentic Community</Text>
          <Text className="text-black">Doing life together with honesty and grace.</Text>
        </View>
        <View className="bg-white rounded-lg p-4 mb-3">
          <Text className="text-blue-900 font-bold text-lg">Biblical Truth</Text>
          <Text className="text-black">Grounded in the unshakeable Word of God.</Text>
        </View>
        <View className="bg-white rounded-lg p-4 mb-3">
          <Text className="text-blue-900 font-bold text-lg">Radical Generosity</Text>
          <Text className="text-black">Giving of our time, talents, and resources.</Text>
        </View>

        <Text className="text-white text-xl font-bold mb-3 mt-4">Time de liderança</Text>
        {[1, 2, 3].map((i) => (
           <View key={i} className="bg-white rounded-lg p-4 mb-3 flex-row">
              <View className="w-16 h-16 bg-gray-300 rounded mr-4" />
              <View className="flex-1 justify-center">
                 <Text className="text-blue-900 font-bold">Rev. David Miller</Text>
                 <Text className="text-blue-400 mb-1">Senior Pastor</Text>
                 <Text className="text-xs text-black">Pastor David has been leading Grace Valley for over 10 years...</Text>
              </View>
           </View>
        ))}

        <View className="bg-gray-300 rounded-lg p-6 items-center mt-4">
           <Text className="font-bold text-lg text-black">Visit Us</Text>
           <Text className="text-center text-black">123 Grace Blvd, Faith City, ST 12345</Text>
           <Text className="text-center text-black mb-2">hello@gracevalley.church</Text>
           <Text className="font-bold text-black">Get Directions</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
