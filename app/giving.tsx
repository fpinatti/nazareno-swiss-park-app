import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function GivingScreen() {
    
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    // Suggestion: show toast
  };

  return (
    <>
      <Stack.Screen 
        options={{
            title: 'Dízimo e Ofertas',
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'black',
        }} 
      />
      <ScrollView className="flex-1 bg-black p-4">
         
         {/* Hero Card */}
         <View className="bg-blue-400 rounded-2xl p-6 items-center mb-6">
             <Ionicons name="heart-outline" size={60} color="white" />
             <Text className="text-white text-2xl font-bold mt-2">Support Our Mission</Text>
             <Text className="text-white text-center mt-2">
                 Your generosity helps us continue to serve our community and share the love of Jesus.
             </Text>
         </View>

         <Text className="text-white text-xl font-bold mb-4">Maneiras de contribuir</Text>

         {/* PIX */}
         <View className="bg-gray-800 rounded-xl p-4 mb-4">
             <View className="flex-row items-center mb-3">
                 <View className="w-8 h-8 bg-red-500 rounded items-center justify-center mr-3">
                     {/* Placeholder icon for PIX */}
                     <View className="w-4 h-4 bg-white/50 skew-x-12" />
                 </View>
                 <Text className="text-white font-bold text-lg">PIX</Text>
             </View>
             
             <View className="bg-gray-600 rounded flex-row items-center px-3 py-3">
                 <Text className="text-white flex-1 mr-2" numberOfLines={1}>{process.env.EXPO_PUBLIC_PIX_KEY}</Text>
                 <TouchableOpacity onPress={() => copyToClipboard(process.env.EXPO_PUBLIC_PIX_KEY || '')}>
                     <Text className="text-white font-bold">Copiar chave</Text>
                 </TouchableOpacity>
             </View>
         </View>

         {/* Bank Transfer */}
         <View className="bg-gray-800 rounded-xl p-4 mb-4">
             <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-red-500 rounded items-center justify-center mr-3">
                     <Ionicons name="card-outline" size={16} color="white" />
                 </View>
                 <Text className="text-white font-bold text-lg">Transferência bancária</Text>
             </View>

             <View className="bg-gray-600 rounded flex-row justify-between px-3 py-3 mb-2">
                 <Text className="text-gray-300">Bank:</Text>
                 <Text className="text-white">{process.env.EXPO_PUBLIC_BANK_NAME}</Text>
             </View>
             <View className="bg-gray-600 rounded flex-row justify-between px-3 py-3 mb-2">
                 <Text className="text-gray-300">Account:</Text>
                 <Text className="text-white">{process.env.EXPO_PUBLIC_BANK_ACCOUNT}</Text>
             </View>
             <View className="bg-gray-600 rounded flex-row justify-between px-3 py-3">
                 <Text className="text-gray-300">Agency:</Text>
                 <Text className="text-white">{process.env.EXPO_PUBLIC_BANK_AGENCY}</Text>
             </View>
         </View>

      </ScrollView>
    </>
  );
}
