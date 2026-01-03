import EventCard, { Event } from '@/components/EventCard';
import eventsData from '@/data/events.json';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">
          Todos os Eventos
        </Text>
      </View>
      <ScrollView contentContainerClassName="p-4">
        {(eventsData as Event[]).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
