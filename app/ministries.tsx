import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MINISTRIES from '@/data/ministries.json';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Ministries() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { isDarkMode } = usePreferenceStore();

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* Header */}
      <View className="z-10 flex-row items-center bg-white px-6 py-4 dark:bg-slate-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? '#fff' : '#1e293b'}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-800 dark:text-white">
          Ministérios
        </Text>
      </View>
      {/* <View className="px-6 py-4 flex-row items-center justify-between bg-white dark:bg-slate-800 z-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray-100 dark:bg-slate-700">
          <Ionicons name="arrow-back" size={24} color="currentColor" className="text-slate-800 dark:text-white" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800 dark:text-white">Ministérios</Text>
        <View className="w-10" />
      </View> */}

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            Envolva-se
          </Text>
          <Text className="mb-8 text-lg text-slate-500 dark:text-slate-400">
            Descubra seu lugar para servir e crescer.
          </Text>

          <View className="space-y-6 gap-4">
            {MINISTRIES.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.9}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all dark:border-slate-700 dark:bg-slate-800"
                >
                  <View className="relative h-40 w-full">
                    <Image
                      source={{ uri: item.image }}
                      className="absolute h-40 w-full"
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.7)']}
                      className="absolute inset-0"
                    />
                    <View className="absolute bottom-4 left-4 flex-row items-center space-x-2">
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <Ionicons
                          name={item.icon as any}
                          size={16}
                          color="white"
                        />
                      </View>
                      <Text className="text-lg font-bold text-white shadow-sm">
                        {item.title}
                      </Text>
                    </View>
                  </View>

                  <View className="p-5">
                    <Text className="leading-6 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </Text>

                    {isExpanded && (
                      <View className="mt-4 border-t border-gray-100 pt-4 dark:border-slate-700">
                        <Text className="leading-6 text-slate-600 dark:text-slate-300">
                          {item.details}
                        </Text>
                      </View>
                    )}

                    <View className="mt-4 flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Text className="mr-2 font-semibold text-indigo-600 dark:text-indigo-400">
                          {isExpanded ? 'Ver menos' : 'Saiba mais'}
                        </Text>
                        <Ionicons
                          name={isExpanded ? 'chevron-up' : 'arrow-forward'}
                          size={16}
                          color="#6366f1"
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
