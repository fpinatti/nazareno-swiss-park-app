import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
  tags: string[];
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <View className="mb-5 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {event.imageUrl ? (
        <Image
          source={{ uri: event.imageUrl }}
          className="h-40 w-full"
          resizeMode="cover"
        />
      ) : (
        <View className="h-40 items-center justify-center bg-gray-200 dark:bg-slate-700">
          <Ionicons name="image-outline" size={40} color="#9ca3af" />
        </View>
      )}

      <View className="p-5">
        <Text className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          {event.title}
        </Text>

        <View className="space-y-2">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#4b5563" />
            <Text className="ml-2 font-medium text-gray-600 dark:text-gray-400">
              {event.date}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#4b5563" />
            <Text className="ml-2 font-medium text-gray-600 dark:text-gray-400">
              {event.time}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#4b5563" />
            <Text className="ml-2 font-medium text-gray-600 dark:text-gray-400">
              {event.location}
            </Text>
          </View>
        </View>

        <Text
          className="mt-4 leading-5 text-gray-600 dark:text-gray-400"
          numberOfLines={3}
        >
          {event.description}
        </Text>
      </View>
    </View>
  );
};

export default EventCard;
