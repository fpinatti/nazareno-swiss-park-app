import { Event } from '@/@types/events';
import { htmlToText } from '@/utils/converter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  // Strip HTML tags from content if needed
  const cleanContent = htmlToText(event.content) || '';
  const cleanExcerpt = htmlToText(event.excerpt) || '';

  return (
    <TouchableOpacity
      onPress={toggleExpand}
      activeOpacity={0.9}
      className="mb-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all dark:border-slate-700 dark:bg-gray-900"
    >
      <View className="relative h-48 w-full">
        {event.featuredImage?.node?.sourceUrl ? (
          <Image
            source={{ uri: event.featuredImage.node.sourceUrl }}
            className="absolute h-full w-full"
            resizeMode="cover"
          />
        ) : (
          <View className="absolute h-full w-full items-center justify-center bg-gray-200 dark:bg-slate-700">
            <Ionicons name="image-outline" size={40} color="#9ca3af" />
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          className="absolute inset-0"
        />
        <View className="absolute bottom-4 left-4 right-4 flex-row items-end justify-between">
          <View className="flex-1 flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
              <Ionicons name="calendar" size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-white shadow-sm">
                {event.title}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="p-5">
        <View className="flex-row flex-wrap gap-4">
          <View className="flex-row items-center w-full">
            <Ionicons name="calendar-outline" size={16} color="#3b82f6" />
            <Text className="ml-2 font-medium text-slate-600 dark:text-slate-400">
              {new Date(event.eventos.data).toLocaleDateString('pt-BR')}
            </Text>
          </View>

          <View className="flex-row items-center w-full">
            <Ionicons name="time-outline" size={16} color="#3b82f6" />
            <Text className="ml-2 font-medium text-slate-600 dark:text-slate-400">
              {new Date(event.eventos.data).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>

          <View className="flex-row items-center w-full">
            <Ionicons name="location-outline" size={16} color="#3b82f6" />
            <Text className="ml-2 font-medium text-slate-600 dark:text-slate-400">
              {event.eventos.local}
            </Text>
          </View>
        </View>
        {(isExpanded) && (
          <View className="mt-4 border-t border-gray-100 dark:border-slate-800">
            <Text className="text-slate-600 dark:text-slate-300">
              {isExpanded ? cleanContent || cleanExcerpt : cleanExcerpt}
            </Text>
          </View>
        )}
        <View className="mt-4 flex-row items-center">
          <Text className="mr-2 font-semibold text-blue-600 dark:text-blue-400">
            {isExpanded ? 'Ver menos' : 'Saiba mais'}
          </Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'arrow-forward'}
            size={16}
            color="#3b82f6"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
