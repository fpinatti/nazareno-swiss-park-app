import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <ScrollView contentContainerClassName="pb-20">
        
        {/* Hero Section */}
        <View className="h-96 w-full relative">
            {/* Placeholder for ImageBackground */}
            <View className="absolute inset-0 bg-gray-600">
               {/* <Image source={{uri: '...'}} className="w-full h-full" resizeMode="cover" /> */}
            </View>
            <View className="absolute inset-0 bg-black/40" /> 
            
            <View className="absolute inset-x-0 bottom-0 p-6">
                <View className="bg-blue-500 self-start px-2 py-1 rounded mb-2">
                    <Text className="text-white text-xs font-bold uppercase">Seja Bem Vindo!</Text>
                </View>
                <Text className="text-white text-4xl font-bold mb-2">Igreja do Nazareno Swiss Park</Text>
                <Text className="text-gray-200 mb-6">Sua igreja, seu lar.</Text>
                
                <View className="flex-row space-x-4 gap-4">
                    <Link href="/about" asChild>
                        <TouchableOpacity className="flex-1 bg-white py-3 rounded items-center">
                            <Text className="text-black font-bold">Novo por aqui?</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/live" asChild>
                        <TouchableOpacity className="flex-1 bg-gray-600/80 py-3 rounded items-center">
                            <Text className="text-white font-bold">Assista</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>

        {/* Info Bar */}
        <View className="flex-row bg-gray-800 py-4 mx-4 -mt-6 rounded-lg shadow-lg relative z-10">
            <View className="flex-1 items-center justify-center border-r border-gray-600">
                <Text className="text-white font-bold text-lg">19:30</Text>
                <Text className="text-gray-400 text-xs text-center uppercase">Reunião de{'\n'}Oração</Text>
            </View>
            <View className="flex-1 items-center justify-center border-r border-gray-600">
                <Text className="text-white font-bold text-lg">Mapa</Text>
                <Text className="text-gray-400 text-xs text-center uppercase">Como{'\n'}Chegar</Text>
            </View>
            <TouchableOpacity 
                className="flex-1 items-center justify-center"
                onPress={() => router.push('/giving')}
            >
                <Text className="text-white font-bold text-lg">Dízimos</Text>
                <Text className="text-gray-400 text-xs text-center uppercase">E Ofertas</Text>
            </TouchableOpacity>
        </View>

        {/* Events Preview */}
        <View className="mt-8 px-4">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white text-xl font-bold">Eventos</Text>
                <TouchableOpacity onPress={() => router.push('/events')}>
                    <Text className="text-blue-400">Ver mais →</Text>
                </TouchableOpacity>
            </View>

            <View className="bg-white rounded-lg overflow-hidden mb-4">
               <View className="h-32 bg-gray-300" />
               <View className="p-4">
                  <Text className="text-xl font-bold text-black mb-1">Cultos</Text>
                   <View className="flex-row items-center mb-1">
                      <Ionicons name="calendar-outline" size={14} color="black" />
                      <Text className="ml-2 text-black text-xs">Todos os domingos</Text>
                   </View>
                   <View className="flex-row items-center mb-1">
                      <Ionicons name="time-outline" size={14} color="black" />
                      <Text className="ml-2 text-black text-xs">10 e 19:30h</Text>
                   </View>
                   <Text className="text-xs text-gray-800 mt-2">
                     Join us for a time of worship and teaching...
                   </Text>
               </View>
            </View>
        </View>

        {/* Verse of Day */}
        <View className="mt-4 px-4 mb-8">
             <View className="bg-blue-900 rounded-lg p-6">
                 <Text className="text-white font-bold mb-2">Versículo do Dia • 31/12/2024</Text>
                 <Text className="text-white text-lg italic mb-4">
                    "Entregue o seu caminho ao Senhor; confie nele, e Ele agirá."
                 </Text>
                 <Text className="text-white text-right font-bold">— Salmos 37:5</Text>
             </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
