import EventCard from '@/components/EventCard';
import { useEvents } from '@/hooks/useEvents';
import { usePreferenceStore } from '@/store/usePreferenceStore';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  const isDark = usePreferenceStore((state) => state.isDarkMode);
  const { events, loading, error } = useEvents();

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? 'dark bg-slate-800' : 'bg-gray-50'}`}
    >
      <View className={`border-gray-100 px-6 py-4 ${isDark ? 'dark bg-slate-800' : 'bg-white'}`}>
        <Text className="text-2xl font-bold text-slate-800 dark:text-white">
          Todos os Eventos
        </Text>
      </View>
      <ScrollView contentContainerClassName="p-6">
        {loading && (
          <View className="py-10">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        )}

        {error && (
          <View className="items-center py-10">
            <Text className="text-red-500">Erro ao carregar eventos.</Text>
          </View>
        )}

        {!loading && events.length === 0 && !error && (
          <View className="items-center py-10">
            <Text className="text-gray-500 dark:text-gray-400">
              Nenhum evento encontrado.
            </Text>
          </View>
        )}

        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
