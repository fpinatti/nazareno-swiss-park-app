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
    <View className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden mb-5 shadow-sm border border-gray-100 dark:border-slate-700">
      {event.imageUrl ? (
        <Image 
          source={{ uri: event.imageUrl }} 
          className="h-40 w-full"
          resizeMode="cover"
        />
      ) : (
        <View className="h-40 bg-gray-200 dark:bg-slate-700 items-center justify-center">
          <Ionicons name="image-outline" size={40} color="#9ca3af" />
        </View>
      )}
      
      <View className="p-5">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</Text>
        
        <View className="space-y-2">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#4b5563" />
            <Text className="ml-2 text-gray-600 dark:text-gray-400 font-medium">{event.date}</Text>
          </View>
          
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#4b5563" />
            <Text className="ml-2 text-gray-600 dark:text-gray-400 font-medium">{event.time}</Text>
          </View>
          
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#4b5563" />
            <Text className="ml-2 text-gray-600 dark:text-gray-400 font-medium">{event.location}</Text>
          </View>
        </View>

        <Text className="text-gray-600 dark:text-gray-400 mt-4 leading-5" numberOfLines={3}>
          {event.description}
        </Text>
      </View>
    </View>
  );
};

export default EventCard;
