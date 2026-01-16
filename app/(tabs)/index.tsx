import DailyVerse from '@/components/DailyVerse';
import EventCard from '@/components/EventCard';
import NextEvent from '@/components/NextEvent';
import { useEvents } from '@/hooks/useEvents';
import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Link, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const videoSource = require('../../assets/videos/hero-background.mp4');

export default function HomeScreen() {
  const router = useRouter();
  const isDark = usePreferenceStore((state) => state.isDarkMode);
  const { events, loading, error } = useEvents();
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.addListener('statusChange', (payload) => {
      if (payload.status === 'readyToPlay') {
        player.play();
      }
      if (payload.status === 'idle') {
        player.play();
      }
    });
  });

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? 'dark bg-slate-800' : 'bg-white'}`}
      edges={['top']}
    >
      <ScrollView contentContainerClassName="pb-20">
        {/* Hero Section */}
        <View className="relative h-96 w-full" style={{ height: 384 }}>
          {/* Placeholder for ImageBackground */}
          <View className="absolute inset-0 bg-gray-600">
            {/* <Image
              source={heroImg}
              className="absolute h-full w-full"
              resizeMode="cover"
            /> */}
            <VideoView
              player={player}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              nativeControls={false}
            />
          </View>

          <View className="absolute inset-0 bg-black/40" />

          <View className="absolute inset-x-0 bottom-0 p-6">
            <View className="mb-2 self-start rounded bg-blue-600 px-2 py-1">
              <Text className="text-xs font-bold uppercase text-white">
                Seja Bem Vindo!
              </Text>
            </View>
            <Text className="mb-2 text-4xl font-bold text-white">
              Igreja do Nazareno Swiss Park
            </Text>
            <Text className="mb-6 text-gray-100">Sua igreja, seu lar.</Text>

            <View className="flex-row gap-4 space-x-4">
              <Link href="/about" asChild>
                <TouchableOpacity className="flex-1 items-center rounded bg-white py-3 shadow-sm">
                  <Text className="font-bold text-black">Novo por aqui?</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/live" asChild>
                <TouchableOpacity className="flex-1 items-center rounded border border-white/20 bg-black/40 py-3">
                  <Text className="font-bold text-white">Assista</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>

        {/* Info Bar */}
        <View className="relative z-10 mx-4 -mt-6 flex-row rounded-2xl border border-gray-100 bg-slate-50 py-4 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <NextEvent />

          <View className="flex-1 items-center justify-center border-r border-gray-200 dark:border-gray-600">
            <Text className="text-lg font-bold text-slate-800 dark:text-white">
              Mapa
            </Text>
            <Text className="text-center text-xs uppercase text-slate-500 dark:text-gray-400">
              Como{'\n'}Chegar
            </Text>
          </View>
          <TouchableOpacity
            className="flex-1 items-center justify-center"
            onPress={() => router.push('/giving')}
          >
            <Text className="text-lg font-bold text-slate-800 dark:text-white">
              Dízimos
            </Text>
            <Text className="text-center text-xs uppercase text-slate-500 dark:text-gray-400">
              E Ofertas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Events Preview */}
        <View className="mt-8 px-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-slate-900 dark:text-white">
              Próximos Eventos
            </Text>
            <TouchableOpacity onPress={() => router.push('/events')}>
              <Text className="text-blue-400">Ver todos →</Text>
            </TouchableOpacity>
          </View>

          {loading && <ActivityIndicator size="small" color="#3b82f6" />}

          {/* {error && <Text className="text-red-500">Erro ao carregar...</Text>} */}

          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>

        {/* Verse of Day */}
        <DailyVerse />
      </ScrollView>
    </SafeAreaView>
  );
}
