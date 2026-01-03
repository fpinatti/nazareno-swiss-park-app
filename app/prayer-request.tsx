import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrayerRequest() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const { isDarkMode } = usePreferenceStore();

  // Status state to manage the UI feedback: 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [validationError, setValidationError] = useState('');

  // CONFIGURAÇÃO DO GOOGLE FORMS
  const GOOGLE_FORM_ACTION_URL = process.env.EXPO_PUBLIC_GOOGLE_FORM_URL || '';
  const NAME_ENTRY_ID = process.env.EXPO_PUBLIC_GOOGLE_FORM_NAME_ENTRY || '';
  const REQUEST_ENTRY_ID =
    process.env.EXPO_PUBLIC_GOOGLE_FORM_REQUEST_ENTRY || '';

  const handleSubmit = async () => {
    if (!request.trim()) {
      setValidationError('Por favor, escreva seu pedido de oração.');
      return;
    }

    setStatus('submitting');

    try {
      const formData = new FormData();
      formData.append(NAME_ENTRY_ID, isAnonymous ? 'Anônimo' : name);
      formData.append(REQUEST_ENTRY_ID, request);

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleClose = () => {
    if (status === 'success') {
      router.back();
    }
    setStatus('idle');
  };

  // Custom Success/Error Modal Component
  const StatusModal = () => (
    <Modal
      transparent
      visible={status === 'success' || status === 'error'}
      animationType="fade"
    >
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View className="w-full max-w-sm items-center rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
          <View
            className={`mb-4 h-16 w-16 items-center justify-center rounded-full ${status === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}
          >
            <Ionicons
              name={status === 'success' ? 'checkmark' : 'warning'}
              size={32}
              color={status === 'success' ? '#10B981' : '#EF4444'}
            />
          </View>

          <Text className="mb-2 text-center text-xl font-bold text-slate-800 dark:text-white">
            {status === 'success' ? 'Pedido Enviado' : 'Erro no Envio'}
          </Text>

          <Text className="mb-6 text-center leading-6 text-slate-500 dark:text-slate-400">
            {status === 'success'
              ? 'Estaremos orando por você. Obrigado por compartilhar.'
              : 'Não foi possível enviar seu pedido. Verifique sua conexão.'}
          </Text>

          <TouchableOpacity
            onPress={handleClose}
            className={`w-full rounded-xl py-3 ${status === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            <Text className="text-center text-lg font-bold text-white">
              {status === 'success' ? 'Amém' : 'Tentar Novamente'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <StatusModal />

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
          Pedidos de Oração
        </Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-base italic leading-6 text-slate-500 dark:text-slate-400">
            "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e
            súplicas, e com ação de graças, apresentem seus pedidos a Deus." -
            Filipenses 4:6
          </Text>
        </View>

        <View className="space-y-6">
          {/* Name Input */}
          <View>
            <Text className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
              Seu Nome (opcional)
            </Text>
            <TextInput
              className={`w-full rounded-2xl border border-gray-200 bg-white p-4 text-lg text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white ${isAnonymous ? 'opacity-50' : ''}`}
              placeholder="Digite seu nome"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Request Input */}
          <View>
            <Text
              className={`mb-2 mt-4 text-sm font-semibold uppercase tracking-wide ${validationError ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}
            >
              Seu Pedido
            </Text>
            <TextInput
              className={`min-h-[160px] w-full rounded-2xl border bg-white p-4 text-lg text-slate-800 dark:bg-slate-800 dark:text-white ${validationError ? 'border-red-500' : 'border-gray-200 dark:border-slate-700'}`}
              placeholder="Compartilhe seu pedido de oração aqui..."
              placeholderTextColor="#94a3b8"
              value={request}
              onChangeText={(text) => {
                setRequest(text);
                if (validationError) setValidationError('');
              }}
              multiline
              textAlignVertical="top"
            />
            {validationError ? (
              <View className="mt-2 flex-row items-center">
                <Ionicons name="alert-circle" size={16} color="#EF4444" />
                <Text className="ml-1 text-sm text-red-500">
                  {validationError}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={status === 'submitting'}
            className={`mt-4 w-full rounded-2xl bg-indigo-600 py-4 shadow-lg shadow-indigo-200 transition-all active:scale-95 dark:shadow-none ${status === 'submitting' ? 'opacity-70' : ''}`}
          >
            {status === 'submitting' ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-lg font-bold text-white">
                Enviar Pedido
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
