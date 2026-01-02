import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MINISTRIES = [
  {
    id: '1',
    title: 'Ministério Infantil',
    description: 'Ensinando a próxima geração nos caminhos do Senhor com amor e diversão.',
    details: 'Nosso ministério infantil oferece um ambiente seguro e acolhedor para crianças de todas as idades. Com aulas bíblicas interativas, músicas e brincadeiras, ajudamos os pequenos a construírem uma base sólida na fé cristã, enquanto se divertem e fazem novos amigos.',
    icon: 'happy-outline',
    image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Juventude',
    description: 'Empoderando jovens para viverem com ousadia por Cristo.',
    details: 'A juventude é um movimento vibrante focado em conectar jovens com Deus e uns com os outros. Através de cultos dinâmicos, células e eventos sociais, encorajamos uma vida de propósito, amizade genuína e impacto na sociedade.',
    icon: 'flame-outline',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Louvor e Adoração',
    description: 'Conduzindo a igreja em adoração em espírito e em verdade.',
    details: 'Nossa equipe de louvor tem o compromisso de criar uma atmosfera onde a presença de Deus é manifesta. Se você tem talentos musicais ou vocais e um coração adorador, venha fazer parte deste time que serve a igreja através da música e das artes.',
    icon: 'musical-notes-outline',
    image: 'https://images.unsplash.com/photo-1510915361408-d5a637458c2c?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Missões',
    description: 'Servindo nossa comunidade e espalhando o evangelho.',
    details: 'O departamento de missões atua local e globalmente, levando o amor de Cristo através de ações práticas e evangelismo. Apoiamos missionários, realizamos viagens missionárias e projetos sociais para atender às necessidades dos menos favorecidos.',
    icon: 'globe-outline',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Homens de Valor',
    description: 'Construindo relacionamentos fortes e fortalecendo a fé.',
    details: 'Este ministério reúne homens para comunhão, estudo da Palavra e oração. Buscamos fortalecer o caráter cristão, o papel na família e na sociedade, encorajando uns aos outros a serem homens segundo o coração de Deus.',
    icon: 'construct-outline',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop'
  }
];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Ministries() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between bg-white dark:bg-slate-800 z-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray-100 dark:bg-slate-700">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800 dark:text-white">Ministérios</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Envolva-se
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
            Descubra seu lugar para servir e crescer.
          </Text>

          <View className="space-y-6">
            {MINISTRIES.map((item) => {
              const isExpanded = expandedId === item.id;
              
              return (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.9}
                  className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 transition-all"
                >
                  <View className="h-40 w-full relative">
                    <Image 
                      source={{ uri: item.image }} 
                      className="w-full h-40 absolute"
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.7)']}
                      className="absolute inset-0"
                    />
                    <View className="absolute bottom-4 left-4 flex-row items-center space-x-2">
                      <View 
                        className="w-8 h-8 rounded-full items-center justify-center bg-white/20 backdrop-blur-md"
                      >
                        <Ionicons name={item.icon as any} size={16} color="white" />
                      </View>
                      <Text className="text-white font-bold text-lg shadow-sm">{item.title}</Text>
                    </View>
                  </View>
                  
                  <View className="p-5">
                    <Text className="text-slate-600 dark:text-slate-300 leading-6">
                      {item.description}
                    </Text>
                    
                    {isExpanded && (
                      <View className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                        <Text className="text-slate-600 dark:text-slate-300 leading-6">
                          {item.details}
                        </Text>
                      </View>
                    )}

                    <View className="mt-4 flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Text className="text-indigo-600 dark:text-indigo-400 font-semibold mr-2">
                          {isExpanded ? 'Ver menos' : 'Saiba mais'}
                        </Text>
                        <Ionicons 
                          name={isExpanded ? "chevron-up" : "arrow-forward"} 
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
