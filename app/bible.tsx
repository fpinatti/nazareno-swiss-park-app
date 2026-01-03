import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BIBLE_BOOKS, BIBLE_VERSIONS } from '../constants/bible';
import { usePreferenceStore } from '../store/usePreferenceStore';
import {
  getBibleChapter,
  getBookChapters,
  getBookName,
} from '../utils/bibleLoader';

export default function BibleScreen() {
  const {
    bibleVersion,
    bibleBookAbbrev,
    bibleChapter,
    isDarkMode,
    fontSize,
    setBibleVersion,
    setBibleBook,
    setBibleChapter,
  } = usePreferenceStore();

  const router = useRouter();

  const [verses, setVerses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadChapter();
  }, [bibleVersion, bibleBookAbbrev, bibleChapter]);

  const loadChapter = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBibleChapter(
        bibleVersion,
        bibleBookAbbrev,
        bibleChapter,
      );
      setVerses(data);
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar o capítulo. Tente escolher outro livro.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextChapter = () => {
    const currentBook = BIBLE_BOOKS.find((b) => b.abbrev === bibleBookAbbrev);
    if (!currentBook) return;

    if (bibleChapter < currentBook.chapters) {
      setBibleChapter(bibleChapter + 1);
    } else {
      // Go to next book
      const bookIndex = BIBLE_BOOKS.indexOf(currentBook);
      if (bookIndex < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[bookIndex + 1];
        setBibleBook(nextBook.abbrev);
        setBibleChapter(1);
      }
    }
  };

  const handlePrevChapter = () => {
    if (bibleChapter > 1) {
      setBibleChapter(bibleChapter - 1);
    } else {
      // Go to previous book
      const currentBook = BIBLE_BOOKS.find((b) => b.abbrev === bibleBookAbbrev);
      if (!currentBook) return;
      const bookIndex = BIBLE_BOOKS.indexOf(currentBook);
      if (bookIndex > 0) {
        const prevBook = BIBLE_BOOKS[bookIndex - 1];
        setBibleBook(prevBook.abbrev);
        setBibleChapter(prevBook.chapters);
      }
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'Pequeno':
        return 'text-base';
      case 'Grande':
        return 'text-xl';
      default:
        return 'text-lg';
    }
  };

  const renderVersionModal = () => (
    <Modal visible={showVersionModal} transparent animationType="fade">
      <TouchableOpacity
        className="flex-1 items-center justify-center bg-black/50"
        activeOpacity={1}
        onPress={() => setShowVersionModal(false)}
      >
        <View className="w-4/5 rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-900">
          <Text className="mb-4 text-center text-xl font-bold dark:text-white">
            Versão da Bíblia
          </Text>
          {BIBLE_VERSIONS.map((v) => (
            <TouchableOpacity
              key={v.id}
              className={`mb-2 rounded-xl p-4 ${bibleVersion === v.id ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-50 dark:bg-slate-800'}`}
              onPress={() => {
                setBibleVersion(v.id);
                setShowVersionModal(false);
              }}
            >
              <Text
                className={`font-semibold ${bibleVersion === v.id ? 'text-blue-600 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}
              >
                {v.name} - {v.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderBookModal = () => (
    <Modal visible={showBookModal} transparent animationType="slide">
      <SafeAreaView className="flex-1 bg-black/50">
        <View className="mt-20 flex-1 overflow-hidden rounded-t-3xl bg-white dark:bg-slate-900">
          <View className="flex-row items-center justify-between border-b border-gray-100 p-4 dark:border-slate-800">
            <Text className="text-xl font-bold dark:text-white">
              Selecione o Livro
            </Text>
            <TouchableOpacity onPress={() => setShowBookModal(false)}>
              <Ionicons
                name="close"
                size={24}
                color={isDarkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={BIBLE_BOOKS}
            keyExtractor={(item) => item.abbrev}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`border-b border-gray-50 p-4 dark:border-slate-800 ${bibleBookAbbrev === item.abbrev ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
                onPress={() => {
                  setBibleBook(item.abbrev);
                  setBibleChapter(1);
                  setShowBookModal(false);
                  setShowChapterModal(true);
                }}
              >
                <Text
                  className={`text-lg ${bibleBookAbbrev === item.abbrev ? 'font-bold text-blue-600' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );

  const renderChapterModal = () => {
    const chaptersCount = getBookChapters(bibleBookAbbrev);
    const chapters = Array.from({ length: chaptersCount }, (_, i) => i + 1);

    return (
      <Modal visible={showChapterModal} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 items-center justify-center bg-black/50"
          activeOpacity={1}
          onPress={() => setShowChapterModal(false)}
        >
          <View className="h-3/4 w-11/12 rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-900">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold dark:text-white">
                Capítulo
              </Text>
              <Text className="text-slate-500">
                {getBookName(bibleBookAbbrev)}
              </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-row flex-wrap justify-between">
                {chapters.map((c) => (
                  <TouchableOpacity
                    key={c}
                    className={`mb-3 aspect-square w-[22%] items-center justify-center rounded-xl ${bibleChapter === c ? 'bg-blue-500' : 'bg-gray-100 dark:bg-slate-800'}`}
                    onPress={() => {
                      setBibleChapter(c);
                      setShowChapterModal(false);
                    }}
                  >
                    <Text
                      className={`text-lg font-bold ${bibleChapter === c ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* HEADER */}
      <View className="z-10 flex-row items-center bg-white px-6 py-4 dark:bg-slate-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? '#fff' : '#1e293b'}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-800 dark:text-white">
          Bíblia
        </Text>
        <TouchableOpacity
          onPress={() => setShowVersionModal(true)}
          className="ml-auto flex-row items-center rounded-full border border-gray-200 bg-gray-100 px-3 py-1 dark:border-slate-700 dark:bg-slate-800"
        >
          <Text className="mr-1 font-bold uppercase text-slate-800 dark:text-white">
            {bibleVersion}
          </Text>
          <Ionicons
            name="chevron-down"
            size={14}
            color={isDarkMode ? 'white' : '#475569'}
          />
        </TouchableOpacity>
      </View>

      {/* <Stack.Screen 
        options={{
            title: 'Bíblia',
            headerStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
            headerTintColor: isDarkMode ? '#fff' : '#000',
            headerRight: () => (
                <TouchableOpacity 
                  onPress={() => setShowVersionModal(true)}
                  className="bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full flex-row items-center border border-gray-200 dark:border-slate-700"
                >
                    <Text className="font-bold mr-1 text-slate-800 dark:text-white uppercase">
                      {bibleVersion}
                    </Text>
                    <Ionicons name="chevron-down" size={14} color={isDarkMode ? 'white' : '#475569'} />
                </TouchableOpacity>
            )
        }} 
       /> */}
      <View className="flex-1 bg-white dark:bg-black">
        {/* Navigation Bar */}
        <View className="flex-row items-center justify-between border-b border-gray-100 bg-white px-4 py-3 shadow-sm dark:border-slate-900 dark:bg-slate-950">
          <TouchableOpacity
            onPress={handlePrevChapter}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-900"
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkMode ? 'white' : '#64748b'}
            />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center justify-center space-x-2">
            <TouchableOpacity
              onPress={() => setShowBookModal(true)}
              className="flex-row items-center rounded-lg bg-gray-50 px-3 py-1 dark:bg-slate-900"
            >
              <Text className="text-lg font-bold text-slate-900 dark:text-white">
                {getBookName(bibleBookAbbrev)}
              </Text>
              <Ionicons
                name="chevron-down"
                size={14}
                color="#64748b"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>

            <Text className="text-lg font-bold text-slate-400">:</Text>

            <TouchableOpacity
              onPress={() => setShowChapterModal(true)}
              className="flex-row items-center rounded-lg bg-gray-50 px-3 py-1 dark:bg-slate-900"
            >
              <Text className="text-lg font-bold text-slate-900 dark:text-white">
                {bibleChapter}
              </Text>
              <Ionicons
                name="chevron-down"
                size={14}
                color="#64748b"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleNextChapter}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-slate-900"
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={isDarkMode ? 'white' : '#64748b'}
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="mt-4 text-slate-500">Alimentando a alma...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center p-10">
            <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
            <Text className="mt-4 text-center text-slate-600 dark:text-slate-400">
              {error}
            </Text>
            <TouchableOpacity
              onPress={loadChapter}
              className="mt-6 rounded-full bg-blue-500 px-6 py-2"
            >
              <Text className="font-bold text-white">Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 p-4"
            showsVerticalScrollIndicator={false}
          >
            <View className="pb-10">
              {verses.map((verse, index) => (
                <Text key={index} className="mb-4">
                  <Text
                    className="text-sm font-bold text-blue-500"
                    style={{ textAlignVertical: 'top' }}
                  >
                    {index + 1}{' '}
                  </Text>
                  <Text
                    className={`leading-8 text-slate-800 dark:text-slate-200 ${getFontSizeClass()}`}
                  >
                    {verse}
                  </Text>
                </Text>
              ))}
            </View>

            {/* Next Chapter Button at bottom */}
            <TouchableOpacity
              onPress={handleNextChapter}
              className="mb-10 flex-row items-center justify-center border-t border-gray-100 py-6 dark:border-slate-800"
            >
              <Text className="mr-2 font-semibold text-slate-500 dark:text-slate-400">
                Próximo Capítulo
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#94a3b8" />
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>

      {renderVersionModal()}
      {renderBookModal()}
      {renderChapterModal()}
    </SafeAreaView>
  );
}
