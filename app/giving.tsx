import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GivingScreen() {
  const router = useRouter();
  const { isDarkMode } = usePreferenceStore();

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    // Suggestion: show toast
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="z-10 flex-row items-center bg-white px-6 py-4 dark:bg-slate-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? '#fff' : '#1e293b'}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-800 dark:text-white">
          Dízimo e Ofertas
        </Text>
      </View>

      <ScrollView className="flex-1 bg-white p-4 dark:bg-black">
        {/* Hero Card */}
        <View className="mb-6 items-center rounded-2xl bg-blue-600 p-6">
          <Ionicons name="heart-outline" size={60} color="white" />
          <Text className="mt-2 text-center text-2xl font-bold text-white">
            Dízimo e Ofertas
          </Text>
          <Text className="mt-2 text-center text-white">
            Sua obediência ajuda a continuar a servir nossa comunidade e
            compartilhar o amor de Jesus.
          </Text>
        </View>

        <Text className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
          Maneiras de contribuir
        </Text>

        {/* PIX */}
        <View className="mb-4 rounded-xl border border-gray-100 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 h-8 w-8 items-center justify-center rounded bg-blue-500">
              <Ionicons name="qr-code-outline" size={16} color="white" />
            </View>
            <Text className="text-lg font-bold text-slate-900 dark:text-white">
              PIX
            </Text>
          </View>

          <View className="flex-row items-center rounded border border-gray-100 bg-white px-3 py-3 dark:border-gray-800 dark:bg-gray-900">
            <Text
              className="mr-2 flex-1 text-slate-600 dark:text-white"
              numberOfLines={1}
            >
              {process.env.EXPO_PUBLIC_PIX_KEY}
            </Text>
            <TouchableOpacity
              onPress={() =>
                copyToClipboard(process.env.EXPO_PUBLIC_PIX_KEY || '')
              }
            >
              <Text className="font-bold text-blue-600 dark:text-blue-400">
                Copiar chave
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bank Transfer */}
        <View className="mb-4 rounded-xl border border-gray-100 bg-slate-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 h-8 w-8 items-center justify-center rounded bg-indigo-500">
              <Ionicons name="card-outline" size={16} color="white" />
            </View>
            <Text className="text-lg font-bold text-slate-900 dark:text-white">
              Transferência bancária
            </Text>
          </View>

          <View className="mb-2 flex-row justify-between rounded border border-gray-100 bg-white px-3 py-3 dark:border-gray-800 dark:bg-gray-900">
            <Text className="text-slate-500 dark:text-gray-400">Bank:</Text>
            <Text className="text-slate-900 dark:text-white">
              {process.env.EXPO_PUBLIC_BANK_NAME}
            </Text>
          </View>
          <View className="mb-2 flex-row justify-between rounded border border-gray-100 bg-white px-3 py-3 dark:border-gray-800 dark:bg-gray-900">
            <Text className="text-slate-500 dark:text-gray-400">Account:</Text>
            <Text className="text-slate-900 dark:text-white">
              {process.env.EXPO_PUBLIC_BANK_ACCOUNT}
            </Text>
          </View>
          <View className="flex-row justify-between rounded border border-gray-100 bg-white px-3 py-3 dark:border-gray-800 dark:bg-gray-900">
            <Text className="text-slate-500 dark:text-gray-400">Agency:</Text>
            <Text className="text-slate-900 dark:text-white">
              {process.env.EXPO_PUBLIC_BANK_AGENCY}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
