import ChurchMap from '@/components/ChurchMap';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import * as Linking from 'expo-linking';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AvatarJuliano from '@/assets/images/juliano.webp';
import AvatarUedson from '@/assets/images/uedson.webp';
import AvatarWlamir from '@/assets/images/wlamir.webp';
const AvatarRicardo = AvatarWlamir;

const PASTORS = [
    {
        name: "Uedson Vieira",
        role: "Pastor",
        avatar: AvatarUedson
    },
    {
        name: "Juliano",
        role: "Pastor",
        avatar: AvatarJuliano
    },
    {
        name: "Wlamir Sacchi",
        role: "Pastor",
        avatar: AvatarWlamir
    },
    {
        name: "Ricardo",
        role: "Pastor",
        avatar: AvatarRicardo
    },
]

export default function AboutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ScrollView contentContainerClassName="p-4">
        <Text className="text-slate-900 dark:text-white text-2xl font-bold mb-4">Bem vindo a Igreja do Nazareno Swiss Park</Text>
        <Text className="text-slate-600 dark:text-gray-300 text-base mb-6">
          Onde quer que esteja na vida, você tem um propósito. Queremos te ajudar a tornar-se a pessoa em que Deus sonhou!
        </Text>
        {/* Placeholder for video */}
        <View className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6" />

        <Text className="text-slate-900 dark:text-white text-xl font-bold mb-3">Nossos valores:</Text>
        
        <View className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-3 border border-gray-100 dark:border-slate-700">
          <Text className="text-blue-600 dark:text-blue-400 font-bold text-lg">Authentic Community</Text>
          <Text className="text-slate-800 dark:text-slate-200">Doing life together with honesty and grace.</Text>
        </View>
        <View className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-3 border border-gray-100 dark:border-slate-700">
          <Text className="text-blue-600 dark:text-blue-400 font-bold text-lg">Biblical Truth</Text>
          <Text className="text-slate-800 dark:text-slate-200">Grounded in the unshakeable Word of God.</Text>
        </View>
        <View className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-3 border border-gray-100 dark:border-slate-700">
          <Text className="text-blue-600 dark:text-blue-400 font-bold text-lg">Radical Generosity</Text>
          <Text className="text-slate-800 dark:text-slate-200">Giving of our time, talents, and resources.</Text>
        </View>

        <Text className="text-slate-900 dark:text-white text-xl font-bold mb-3 mt-4">Equipe Pastoral</Text>
        {PASTORS.map((pastor, index) => (
          <View key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-3 flex-row border border-gray-100 dark:border-slate-700">
            <ExpoImage 
              source={pastor.avatar} 
              className="w-16 h-16 rounded mr-4"
              contentFit="cover"
            />
            <View className="flex-1 justify-center">
                <Text className="text-slate-900 dark:text-white font-bold">{pastor.name}</Text>
                <Text className="text-blue-600 dark:text-blue-400 mb-1">{pastor.role}</Text>
            </View>
          </View>
        ))}
    
        <View className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 items-center mt-4 border border-gray-100 dark:border-slate-700">
           <Text className="font-bold text-lg text-slate-900 dark:text-white">Visite-nos</Text>
           <Text className="text-center text-slate-600 dark:text-gray-300">R. Arcebispo Dom Luciano Mendes de Almeida, s/n</Text>
           <Text className="text-center text-slate-600 dark:text-gray-300 mb-4">Swiss Park, Campinas - SP</Text>
           
            <View className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 justify-center items-center">
              <ChurchMap />
            </View>

           <TouchableOpacity 
             onPress={() => {
               const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
               const latLng = '-22.97872,-47.07052';
               const label = 'Igreja do Nazareno Swiss Park';
               const url = Platform.select({
                 ios: `${scheme}${label}@${latLng}`,
                 android: `${scheme}${latLng}(${label})`
               });
               if (url) Linking.openURL(url || `https://www.google.com/maps/search/?api=1&query=${latLng}`);
             }}
             className="bg-blue-600 px-6 py-3 rounded-full mt-4 flex-row items-center"
           >
             <Ionicons name="location-sharp" size={20} color="white" style={{ marginRight: 8 }} />
             <Text className="text-white font-bold">Como chegar</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
