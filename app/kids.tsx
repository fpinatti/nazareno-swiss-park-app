import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';

import KIDS_VIDEOS from '@/data/kids-videos.json';

const { width } = Dimensions.get('window');

interface Video {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
}

export default function KidsPage() {
  const router = useRouter();
  const { isDarkMode } = usePreferenceStore();
  const [selectedVideo, setSelectedVideo] = useState<Video>(KIDS_VIDEOS[0]);
  const [playing, setPlaying] = useState(false);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setPlaying(true);
  };

  const onStateChange = (state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-purple-50 to-pink-50 dark:bg-neutral-900">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="z-10 flex-row items-center bg-white px-6 py-4 dark:bg-slate-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? '#fff' : '#1e293b'}
          />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Ionicons
            name="happy-outline"
            size={24}
            color={isDarkMode ? '#f472b6' : '#ec4899'}
          />
          <Text className="ml-2 text-2xl font-bold text-slate-800 dark:text-white">
            Kids
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Video Player */}
        <View className="bg-black">
          <View className="aspect-video w-full">
            <YoutubePlayer
              height={(width * 9) / 16}
              play={playing}
              videoId={selectedVideo.videoId}
              onChangeState={onStateChange}
            />
          </View>
        </View>

        {/* Currently Playing Info */}
        <View className="border-b border-gray-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <View className="flex-row items-start">
            <View className="mr-3 rounded-full bg-pink-100 p-2 dark:bg-pink-900/30">
              <Ionicons
                name="play-circle"
                size={24}
                color={isDarkMode ? '#f472b6' : '#ec4899'}
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                {selectedVideo.title}
              </Text>
              <Text className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
                {selectedVideo.description}
              </Text>
              <View className="mt-2 flex-row items-center">
                <Ionicons name="time-outline" size={14} color="#94a3b8" />
                <Text className="ml-1 text-xs text-slate-400 dark:text-neutral-500">
                  {selectedVideo.duration}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section Title */}
        <View className="px-5 pb-3 pt-6">
          <Text className="text-xl font-bold text-slate-900 dark:text-white">
            Mais Vídeos
          </Text>
          <Text className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
            Escolha um vídeo para assistir
          </Text>
        </View>

        {/* Video Thumbnails Grid */}
        <View className="px-4">
          {KIDS_VIDEOS.map((video) => (
            <TouchableOpacity
              key={video.id}
              onPress={() => handleVideoSelect(video)}
              activeOpacity={0.8}
              className={`mb-4 overflow-hidden rounded-2xl border-2 ${
                selectedVideo.id === video.id
                  ? 'border-pink-500 dark:border-pink-400'
                  : 'border-transparent'
              }`}
            >
              <View className="flex-row bg-white dark:bg-neutral-800">
                {/* Thumbnail */}
                <View className="relative h-24 w-36">
                  <Image
                    source={{ uri: video.thumbnail }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                  {/* Play Icon Overlay */}
                  <View className="absolute inset-0 items-center justify-center">
                    <View className="rounded-full bg-black/50 p-2">
                      <Ionicons name="play" size={20} color="white" />
                    </View>
                  </View>
                  {/* Duration Badge */}
                  <View className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5">
                    <Text className="text-xs font-medium text-white">
                      {video.duration}
                    </Text>
                  </View>
                  {/* Selected Indicator */}
                  {selectedVideo.id === video.id && (
                    <LinearGradient
                      colors={['transparent', 'rgba(236, 72, 153, 0.3)']}
                      className="absolute inset-0"
                    />
                  )}
                </View>

                {/* Video Info */}
                <View className="flex-1 justify-center p-3">
                  <Text
                    numberOfLines={2}
                    className={`text-sm font-semibold leading-tight ${
                      selectedVideo.id === video.id
                        ? 'text-pink-600 dark:text-pink-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {video.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="mt-1 text-xs text-slate-500 dark:text-neutral-400"
                  >
                    {video.description}
                  </Text>
                  {selectedVideo.id === video.id && (
                    <View className="mt-2 flex-row items-center">
                      <View className="mr-1 h-2 w-2 animate-pulse rounded-full bg-pink-500" />
                      <Text className="text-xs font-medium text-pink-500 dark:text-pink-400">
                        Assistindo agora
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Fun Footer Section */}
        <View className="mx-4 mb-6 mt-4 overflow-hidden rounded-3xl">
          <LinearGradient
            colors={isDarkMode ? ['#831843', '#6b21a8'] : ['#f472b6', '#c084fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6"
          >
            <View className="flex-row items-center">
              <View className="mr-4 rounded-full bg-white/20 p-3">
                <Ionicons name="sparkles" size={28} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-white">
                  Aprendendo com a Bíblia! 📖
                </Text>
                <Text className="mt-1 text-sm text-white/80">
                  Cada história nos ensina sobre o amor de Deus
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
