import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BibleScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen 
        options={{
            title: 'Bíblia',
            headerStyle: { backgroundColor: 'white' }, // Screenshot shows white header
            headerTintColor: 'black',
            headerRight: () => (
                <View className="bg-gray-200 px-3 py-1 rounded-full flex-row items-center">
                    <Text className="font-bold mr-1">NVI</Text>
                    <Ionicons name="chevron-down" size={16} color="black" />
                </View>
            )
        }} 
       />
       <View className="flex-1 bg-black">
          {/* Navigation Bar */}
          <View className="bg-gray-200 flex-row items-center justify-between px-4 py-3">
             <TouchableOpacity>
                 <Ionicons name="chevron-back" size={24} color="black" />
             </TouchableOpacity>
             <TouchableOpacity className="flex-row items-center">
                 <Text className="font-bold text-lg mr-2">Gênesis</Text>
                 <Ionicons name="chevron-down" size={16} color="black" />
                 <Text className="font-bold text-lg ml-2 mr-2">:</Text>
                 <Text className="font-bold text-lg mr-2">1</Text>
                 <Ionicons name="chevron-down" size={16} color="black" />
             </TouchableOpacity>
             <TouchableOpacity>
                 <Ionicons name="chevron-forward" size={24} color="black" />
             </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-4">
              <Text className="text-white text-lg leading-8">
                  No princípio Deus criou os céus e a terra. Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas. 
                  {'\n\n'}
                  Disse Deus: "Haja luz", e houve luz. Deus viu que a luz era boa, e separou a luz das trevas. Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia.
                  {'\n\n'}
                  Depois disse Deus: "Haja entre as águas um firmamento que separe águas de águas". Então Deus fez o firmamento e separou as águas que ficaram abaixo do firmamento das que ficaram por cima. E assim foi. Ao firmamento Deus chamou céu. Passaram-se a tarde e a manhã; esse foi o segundo dia.
              </Text>
          </ScrollView>
       </View>
    </>
  );
}
