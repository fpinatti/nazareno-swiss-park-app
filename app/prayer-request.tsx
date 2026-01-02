import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrayerRequest() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Status state to manage the UI feedback: 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState('');

  // CONFIGURAÇÃO DO GOOGLE FORMS
  const GOOGLE_FORM_ACTION_URL = process.env.EXPO_PUBLIC_GOOGLE_FORM_URL || "";
  const NAME_ENTRY_ID = process.env.EXPO_PUBLIC_GOOGLE_FORM_NAME_ENTRY || "";
  const REQUEST_ENTRY_ID = process.env.EXPO_PUBLIC_GOOGLE_FORM_REQUEST_ENTRY || "";

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
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white dark:bg-slate-800 p-6 rounded-2xl w-full max-w-sm items-center shadow-xl">
          <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${status === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <Ionicons 
              name={status === 'success' ? "checkmark" : "warning"} 
              size={32} 
              color={status === 'success' ? "#10B981" : "#EF4444"} 
            />
          </View>
          
          <Text className="text-xl font-bold text-slate-800 dark:text-white mb-2 text-center">
            {status === 'success' ? 'Pedido Enviado' : 'Erro no Envio'}
          </Text>
          
          <Text className="text-slate-500 dark:text-slate-400 text-center mb-6 leading-6">
            {status === 'success' 
              ? 'Estaremos orando por você. Obrigado por compartilhar.' 
              : 'Não foi possível enviar seu pedido. Verifique sua conexão.'}
          </Text>

          <TouchableOpacity 
            onPress={handleClose}
            className={`w-full py-3 rounded-xl ${status === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            <Text className="text-white font-bold text-center text-lg">
              {status === 'success' ? 'Amém' : 'Tentar Novamente'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      <StatusModal />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between bg-white dark:bg-slate-800 shadow-sm z-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray-100 dark:bg-slate-700">
          <Ionicons name="arrow-back" size={24} color="currentColor" className="text-slate-800 dark:text-white" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800 dark:text-white">Pedidos de Oração</Text>
        <View className="w-10" /> 
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-slate-500 dark:text-slate-400 text-base leading-6 italic">
            "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus." - Filipenses 4:6
          </Text>
        </View>

        <View className="space-y-6">
          {/* Name Input */}
          <View>
            <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
              {isAnonymous ? 'Nome (Oculto)' : 'Seu Nome'}
            </Text>
            <TextInput
              className={`w-full p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 text-slate-800 dark:text-white text-lg ${isAnonymous ? 'opacity-50' : ''}`}
              placeholder={isAnonymous ? "Anônimo" : "Digite seu nome"}
              placeholderTextColor="#94a3b8"
              value={isAnonymous ? '' : name}
              onChangeText={setName}
              editable={!isAnonymous}
            />
          </View>

          {/* Request Input */}
          <View>
            <Text className={`text-sm font-semibold mb-2 uppercase tracking-wide ${validationError ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
              Seu Pedido
            </Text>
            <TextInput
              className={`w-full p-4 bg-white dark:bg-slate-800 rounded-2xl border text-slate-800 dark:text-white text-lg min-h-[160px] ${validationError ? 'border-red-500' : 'border-gray-200 dark:border-slate-700'}`}
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
              <View className="flex-row items-center mt-2">
                <Ionicons name="alert-circle" size={16} color="#EF4444" />
                <Text className="text-red-500 text-sm ml-1">{validationError}</Text>
              </View>
            ) : null}
          </View>

          {/* Anonymous Toggle */}
          <View className="flex-row items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700">
            <View>
              <Text className="text-lg font-medium text-slate-800 dark:text-white">Pedido Anônimo</Text>
              <Text className="text-slate-500 text-sm">Ocultar seu nome da equipe de oração</Text>
            </View>
            <Switch
              value={isAnonymous}
              onValueChange={setIsAnonymous}
              trackColor={{ false: '#e2e8f0', true: '#6366f1' }}
              thumbColor={isAnonymous ? '#ffffff' : '#f8fafc'}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            onPress={handleSubmit}
            disabled={status === 'submitting'}
            className={`w-full bg-indigo-600 py-4 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 transition-all mt-4 ${status === 'submitting' ? 'opacity-70' : ''}`}
          >
            {status === 'submitting' ? (
               <ActivityIndicator color="white" />
            ) : (
               <Text className="text-white text-center font-bold text-lg">Enviar Pedido</Text>
            )}
          </TouchableOpacity>
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
