import ChurchMap from '@/components/ChurchMap';
import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AvatarJuliano from '@/assets/images/juliano.png';
import HeroChurch from '@/assets/images/nazareno-swiss-park-about.jpg';
import AvatarUedson from '@/assets/images/uedson.png';
import AvatarWlamir from '@/assets/images/wlamir.png';
const AvatarRicardo = AvatarWlamir;

const PASTORS = [
  {
    name: 'Uedson Vieira',
    role: 'Pastor',
    avatar: AvatarUedson,
  },
  {
    name: 'Juliano',
    role: 'Pastor',
    avatar: AvatarJuliano,
  },
  {
    name: 'Wlamir Sacchi',
    role: 'Pastor',
    avatar: AvatarWlamir,
  },
  {
    name: 'Ricardo',
    role: 'Pastor',
    avatar: AvatarRicardo,
  },
];

export default function AboutScreen() {
  const isDark = usePreferenceStore((state) => state.isDarkMode);
  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? 'dark bg-slate-800' : 'bg-white'}`}
    >
      <ScrollView contentContainerClassName="p-4">
        <Text className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
          Bem vindo a Igreja do Nazareno Swiss Park
        </Text>
        <Text className="mb-6 text-base text-slate-600 dark:text-gray-300">
          Onde quer que esteja na vida, você tem um propósito. Queremos te
          ajudar a tornar-se a pessoa em que Deus sonhou!
        </Text>
        {/* Hero Image */}
        <View className="mb-6 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            source={HeroChurch}
            className="h-full w-full"
            resizeMode="cover"
          />
        </View>

        <Text className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
          Nossos valores:
        </Text>

        <View className="mb-3 rounded-lg border border-gray-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-gray-900">
          <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Comunidade Autêntica
          </Text>
          <Text className="text-slate-800 dark:text-slate-200">
            Fazendo vida juntos com honestidade e graça.
          </Text>
        </View>
        <View className="mb-3 rounded-lg border border-gray-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-gray-900">
          <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Verdade Biblica
          </Text>
          <Text className="text-slate-800 dark:text-slate-200">
            Fundada na palavra inabalável de Deus.
          </Text>
        </View>
        <View className="mb-3 rounded-lg border border-gray-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-gray-900">
          <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Generosidade Radical
          </Text>
          <Text className="text-slate-800 dark:text-slate-200">
            Doando tempo, talentos e recursos.
          </Text>
        </View>

        <Text className="mb-3 mt-4 text-xl font-bold text-slate-900 dark:text-white">
          Equipe Pastoral
        </Text>
        {PASTORS.map((pastor, index) => (
          <View
            key={index}
            className="mb-3 flex-row rounded-lg border border-gray-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-gray-900"
          >
            <View className="mr-4 h-16 w-16 overflow-hidden rounded-full">
              <Image
                source={pastor.avatar}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1 justify-center">
              <Text className="font-bold text-slate-900 dark:text-white">
                {pastor.name}
              </Text>
              <Text className="mb-1 text-blue-600 dark:text-blue-400">
                {pastor.role}
              </Text>
            </View>
          </View>
        ))}

        <View className="mt-4 items-center rounded-2xl border border-gray-100 bg-slate-100 p-6 dark:border-slate-700 dark:bg-slate-800">
          <Text className="text-lg font-bold text-slate-900 dark:text-white">
            Visite-nos
          </Text>
          <Text className="text-center text-slate-600 dark:text-gray-300">
            R. Arcebispo Dom Luciano Mendes de Almeida, s/n
          </Text>
          <Text className="mb-4 text-center text-slate-600 dark:text-gray-300">
            Swiss Park, Campinas - SP
          </Text>

          <View className="h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-slate-600 dark:bg-slate-700">
            <ChurchMap />
          </View>

          <TouchableOpacity
            onPress={() => {
              const scheme = Platform.select({
                ios: 'maps:0,0?q=',
                android: 'geo:0,0?q=',
              });
              const latLng = '-22.97872,-47.07052';
              const label = 'Igreja do Nazareno Swiss Park';
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`,
              });
              if (url)
                Linking.openURL(
                  url ||
                    `https://www.google.com/maps/search/?api=1&query=${latLng}`,
                );
            }}
            className="mt-4 flex-row items-center rounded-full bg-blue-600 px-6 py-3"
          >
            <Ionicons
              name="location-sharp"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text className="font-bold text-white">Como chegar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
