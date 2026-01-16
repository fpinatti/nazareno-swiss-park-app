import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

export default function LivePage() {
  const [playing, setPlaying] = useState(false);
  const [videoTitle, setVideoTitle] = useState('Culto ao Vivo');
  const router = useRouter();
  const { isDarkMode } = usePreferenceStore();
  const isDark = usePreferenceStore((state) => state.isDarkMode);

  const videoId = process.env.EXPO_PUBLIC_YOUTUBE_VIDEO_ID;

  useEffect(() => {
    const fetchVideoTitle = async () => {
      if (!videoId) return;

      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        const data = await response.json();
        if (data.title) {
          setVideoTitle(data.title);
        }
      } catch (error) {
        console.error('Error fetching video title:', error);
      }
    };

    fetchVideoTitle();
  }, [videoId]);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      // Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'dark bg-slate-800' : 'bg-white'}`}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className={`z-10 flex-row items-center px-6 py-4 ${isDark ? 'dark bg-slate-800' : 'bg-white'}`}>
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? '#fff' : '#1e293b'}
          />
        </TouchableOpacity>
        <View className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        <Text className="text-2xl font-bold text-slate-800 dark:text-white">
          Ao vivo 
        </Text>
      </View>
      {/* <View className="flex-row items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-neutral-800">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-neutral-800"
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="currentColor"
            className="text-slate-800 dark:text-white"
          />
        </TouchableOpacity>

        <View className="flex-row items-center gap-2 space-x-2">
          <View className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <Text className="text-lg font-bold text-slate-900 dark:text-white">
            LIVE
          </Text>
        </View>

        <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-neutral-800">
          <Ionicons
            name="share-outline"
            size={20}
            color="currentColor"
            className="text-slate-800 dark:text-white"
          />
        </TouchableOpacity>
      </View> */}

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Video Container */}
        <View className="aspect-video w-full bg-black">
          <YoutubePlayer
            height={(width * 9) / 16}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
          />
        </View>

        {/* Video Info */}
        <View className="p-5">
          <Text className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">
            {videoTitle}
          </Text>
          <Text className="mt-2 text-base text-slate-500 dark:text-neutral-400">
            Junte-se a nós na live da igreja do Nazareno Swiss Park. Estamos felizes em ter você conosco!
          </Text>

          {/* <View className="mt-4 flex-row gap-6 space-x-4 border-b border-t border-gray-100 py-4 dark:border-neutral-800">
            <View className="items-center">
              <Ionicons name="eye-outline" size={24} color="#64748b" />
              <Text className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                1.2K Watching
              </Text>
            </View>
            <View className="items-center">
              <Ionicons name="heart-outline" size={24} color="#64748b" />
              <Text className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                458 Likes
              </Text>
            </View>
            <View className="items-center">
              <Ionicons name="chatbubble-outline" size={24} color="#64748b" />
              <Text className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                Live Chat
              </Text>
            </View>
          </View> */}
        </View>

        {/* Upcoming / Recent */}
        <View className="mt-2 px-5">
          {/* <Text className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            You might also like
          </Text> */}

          {/* Card 1 */}
          {/* <TouchableOpacity className="mb-4 flex-row rounded-2xl border border-gray-100 bg-slate-50 p-3 dark:border-transparent dark:bg-neutral-800/50">
            <View className="h-20 w-32 items-center justify-center rounded-xl bg-gray-200 dark:bg-neutral-700">
              <Ionicons
                name="play"
                size={24}
                color="gray"
                className="dark:text-white"
              />
            </View>
            <View className="ml-3 flex-1 justify-center">
              <Text className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
                Previous Service
              </Text>
              <Text className="text-sm text-slate-500 dark:text-neutral-400">
                Pastor John Doe • 2 days ago
              </Text>
            </View>
          </TouchableOpacity> */}

          {/* Card 2 */}
          {/* <TouchableOpacity className="mb-4 flex-row rounded-2xl border border-gray-100 bg-slate-50 p-3 dark:border-transparent dark:bg-neutral-800/50">
            <View className="h-20 w-32 items-center justify-center rounded-xl bg-gray-200 dark:bg-neutral-700">
              <Ionicons
                name="play"
                size={24}
                color="gray"
                className="dark:text-white"
              />
            </View>
            <View className="ml-3 flex-1 justify-center">
              <Text className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
                Worship Highlights
              </Text>
              <Text className="text-sm text-slate-500 dark:text-neutral-400">
                Worship Team • 1 week ago
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Call to Action Button */}
      {/* <View className="absolute bottom-10 left-0 right-0 px-5">
        <TouchableOpacity className="transform items-center rounded-full bg-white py-4 shadow-lg transition-all active:scale-95">
          <Text className="text-lg font-bold text-neutral-900">
            Give Online
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
