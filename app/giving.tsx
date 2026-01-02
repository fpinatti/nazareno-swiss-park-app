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
      <ScrollView className="flex-1 bg-white dark:bg-black p-4">
         
         {/* Hero Card */}
         <View className="bg-blue-600 rounded-2xl p-6 items-center mb-6">
             <Ionicons name="heart-outline" size={60} color="white" />
             <Text className="text-white text-2xl font-bold mt-2 text-center">Support Our Mission</Text>
             <Text className="text-white text-center mt-2">
                 Your generosity helps us continue to serve our community and share the love of Jesus.
             </Text>
         </View>

         <Text className="text-slate-900 dark:text-white text-xl font-bold mb-4">Maneiras de contribuir</Text>

         {/* PIX */}
         <View className="bg-slate-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
             <View className="flex-row items-center mb-3">
                 <View className="w-8 h-8 bg-blue-500 rounded items-center justify-center mr-3">
                     <Ionicons name="qr-code-outline" size={16} color="white" />
                 </View>
                 <Text className="text-slate-900 dark:text-white font-bold text-lg">PIX</Text>
             </View>
             
             <View className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded flex-row items-center px-3 py-3">
                 <Text className="text-slate-600 dark:text-white flex-1 mr-2" numberOfLines={1}>{process.env.EXPO_PUBLIC_PIX_KEY}</Text>
                 <TouchableOpacity onPress={() => copyToClipboard(process.env.EXPO_PUBLIC_PIX_KEY || '')}>
                     <Text className="text-blue-600 dark:text-blue-400 font-bold">Copiar chave</Text>
                 </TouchableOpacity>
             </View>
         </View>

         {/* Bank Transfer */}
         <View className="bg-slate-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
             <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-indigo-500 rounded items-center justify-center mr-3">
                     <Ionicons name="card-outline" size={16} color="white" />
                 </View>
                 <Text className="text-slate-900 dark:text-white font-bold text-lg">Transferência bancária</Text>
             </View>

             <View className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded flex-row justify-between px-3 py-3 mb-2">
                 <Text className="text-slate-500 dark:text-gray-400">Bank:</Text>
                 <Text className="text-slate-900 dark:text-white">{process.env.EXPO_PUBLIC_BANK_NAME}</Text>
             </View>
             <View className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded flex-row justify-between px-3 py-3 mb-2">
                 <Text className="text-slate-500 dark:text-gray-400">Account:</Text>
                 <Text className="text-slate-900 dark:text-white">{process.env.EXPO_PUBLIC_BANK_ACCOUNT}</Text>
             </View>
             <View className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded flex-row justify-between px-3 py-3">
                 <Text className="text-slate-500 dark:text-gray-400">Agency:</Text>
                 <Text className="text-slate-900 dark:text-white">{process.env.EXPO_PUBLIC_BANK_AGENCY}</Text>
             </View>
         </View>

      </ScrollView>
    </>
  );
}
