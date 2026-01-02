import DailyVerse from '@/components/DailyVerse';
import EventCard, { Event } from '@/components/EventCard';
import NextEvent from '@/components/NextEvent';
import eventsData from '@/data/events.json';
import { Link, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={['top']}>
      <ScrollView contentContainerClassName="pb-20">
        
        {/* Hero Section */}
        <View className="h-96 w-full relative">
            {/* Placeholder for ImageBackground */}
            <View className="absolute inset-0 bg-gray-600">
               {/* <Image source={{uri: '...'}} className="w-full h-full" resizeMode="cover" /> */}
            </View>
            <View className="absolute inset-0 bg-black/40" /> 
            
            <View className="absolute inset-x-0 bottom-0 p-6">
                <View className="bg-blue-600 self-start px-2 py-1 rounded mb-2">
                    <Text className="text-white text-xs font-bold uppercase">Seja Bem Vindo!</Text>
                </View>
                <Text className="text-white text-4xl font-bold mb-2">Igreja do Nazareno Swiss Park</Text>
                <Text className="text-gray-100 mb-6">Sua igreja, seu lar.</Text>
                
                <View className="flex-row space-x-4 gap-4">
                    <Link href="/about" asChild>
                        <TouchableOpacity className="flex-1 bg-white py-3 rounded items-center shadow-sm">
                            <Text className="text-black font-bold">Novo por aqui?</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/live" asChild>
                        <TouchableOpacity className="flex-1 bg-black/40 border border-white/20 py-3 rounded items-center">
                            <Text className="text-white font-bold">Assista</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>

        {/* Info Bar */}
        <View className="flex-row bg-slate-50 dark:bg-gray-800 py-4 mx-4 -mt-6 rounded-2xl shadow-xl relative z-10 border border-gray-100 dark:border-gray-700">
            <NextEvent />

            <View className="flex-1 items-center justify-center border-r border-gray-200 dark:border-gray-600">
                <Text className="text-slate-800 dark:text-white font-bold text-lg">Mapa</Text>
                <Text className="text-slate-500 dark:text-gray-400 text-xs text-center uppercase">Como{'\n'}Chegar</Text>
            </View>
            <TouchableOpacity 
                className="flex-1 items-center justify-center"
                onPress={() => router.push('/giving')}
            >
                <Text className="text-slate-800 dark:text-white font-bold text-lg">Dízimos</Text>
                <Text className="text-slate-500 dark:text-gray-400 text-xs text-center uppercase">E Ofertas</Text>
            </TouchableOpacity>
        </View>

        {/* Events Preview */}
        <View className="mt-8 px-4">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-slate-900 dark:text-white text-xl font-bold">Próximos Eventos</Text>
                <TouchableOpacity onPress={() => router.push('/events')}>
                    <Text className="text-blue-400">Ver todos →</Text>
                </TouchableOpacity>
            </View>

            {(eventsData as Event[])
              .filter(event => event.tags.includes('home'))
              .map(event => (
                <EventCard key={event.id} event={event} />
              ))
            }
        </View>

        {/* Verse of Day */}
        <DailyVerse />

      </ScrollView>
    </SafeAreaView>
  );
}
