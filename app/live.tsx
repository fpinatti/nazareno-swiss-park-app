import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

export default function LivePage() {
  const [playing, setPlaying] = useState(false);
  const router = useRouter();

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      // Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-800">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-neutral-800"
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View className="flex-row items-center space-x-2 gap-2">
          <View className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <Text className="text-white font-bold text-lg">LIVE</Text>
        </View>

        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-neutral-800">
          <Ionicons name="share-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Video Container */}
        <View className="w-full aspect-video bg-black">
          <YoutubePlayer
            height={width * 9 / 16}
            play={playing}
            videoId={process.env.EXPO_PUBLIC_YOUTUBE_VIDEO_ID} 
            onChangeState={onStateChange}
            webViewProps={{
                allowsInlineMediaPlayback: true,
                mediaPlaybackRequiresUserAction: false,
               
            }}
          />
        </View>

        {/* Video Info */}
        <View className="p-5">
            <Text className="text-white text-2xl font-bold leading-tight">
                Sunday Morning Service - Worship & Word
            </Text>
            <Text className="text-neutral-400 mt-2 text-base">
                Join us live from Naza Swiss Park. We are glad you are here!
            </Text>

            <View className="flex-row mt-4 space-x-4 border-t border-b border-neutral-800 py-4 gap-6">
                <View className="items-center">
                    <Ionicons name="eye-outline" size={24} color="#a3a3a3" />
                    <Text className="text-neutral-400 text-xs mt-1">1.2K Watching</Text>
                </View>
                <View className="items-center">
                    <Ionicons name="heart-outline" size={24} color="#a3a3a3" />
                    <Text className="text-neutral-400 text-xs mt-1">458 Likes</Text>
                </View>
                 <View className="items-center">
                    <Ionicons name="chatbubble-outline" size={24} color="#a3a3a3" />
                    <Text className="text-neutral-400 text-xs mt-1">Live Chat</Text>
                </View>
            </View>
        </View>

        {/* Upcoming / Recent */}
        <View className="px-5 mt-2">
            <Text className="text-white text-lg font-bold mb-4">You might also like</Text>
            
            {/* Card 1 */}
            <TouchableOpacity className="flex-row mb-4 bg-neutral-800/50 p-3 rounded-xl">
                 <View className="w-32 h-20 bg-neutral-700 rounded-lg justify-center items-center">
                     <Ionicons name="play" size={24} color="white" />
                 </View>
                 <View className="ml-3 flex-1 justify-center">
                     <Text className="text-white font-semibold text-base mb-1">Previous Service</Text>
                     <Text className="text-neutral-400 text-sm">Pastor John Doe • 2 days ago</Text>
                 </View>
            </TouchableOpacity>

             {/* Card 2 */}
            <TouchableOpacity className="flex-row mb-4 bg-neutral-800/50 p-3 rounded-xl">
                 <View className="w-32 h-20 bg-neutral-700 rounded-lg justify-center items-center">
                         <Ionicons name="play" size={24} color="white" />
                 </View>
                 <View className="ml-3 flex-1 justify-center">
                     <Text className="text-white font-semibold text-base mb-1">Worship Highlights</Text>
                     <Text className="text-neutral-400 text-sm">Worship Team • 1 week ago</Text>
                 </View>
            </TouchableOpacity>
        </View>
      </ScrollView>

         {/* Call to Action Button */}
        <View className="absolute bottom-10 left-0 right-0 px-5">
             <TouchableOpacity className="bg-white py-4 rounded-full items-center shadow-lg active:scale-95 transform transition-all">
                <Text className="text-neutral-900 font-bold text-lg">Give Online</Text>
             </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
