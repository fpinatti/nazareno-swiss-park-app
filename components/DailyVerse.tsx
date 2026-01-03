import versesData from '@/data/verses.json';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

interface Verse {
  date: string;
  verse: string;
  reference: string;
}

const DailyVerse = () => {
  const dailyVerse = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const todayStr = `${year}-${month}-${day}`;
    const todayMMDD = `${month}-${day}`;

    const allVerses = versesData as Verse[];
    if (allVerses.length === 0) return null;

    // 1. Try exact YYYY-MM-DD match
    const exactMatch = allVerses.find((v) => v.date === todayStr);
    if (exactMatch) return exactMatch;

    // 2. Try MM-DD match (ignoring year) - Great for testing or recurring verses
    // We sort by year descending to get the most recent year's version of today
    const calendarMatches = allVerses
      .filter((v) => v.date.endsWith(todayMMDD))
      .sort((a, b) => b.date.localeCompare(a.date));

    if (calendarMatches.length > 0) return calendarMatches[0];

    // 3. Fallback: Latest verse that is NOT in the future
    // To be safe, we'll sort all verses descending
    const sortedVerses = [...allVerses].sort((a, b) =>
      b.date.localeCompare(a.date),
    );

    const pastOrTodayVerses = sortedVerses.filter((v) => v.date <= todayStr);
    if (pastOrTodayVerses.length > 0) {
      return pastOrTodayVerses[0];
    }

    // 4. Absolute fallback: the highest date in the file (if everything is technically "future")
    return sortedVerses[0];
  }, []);

  if (!dailyVerse) return null;

  // Format date for display (DD/MM/YYYY)
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View className="mb-8 mt-4 px-4">
      <View className="rounded-lg bg-blue-900 p-6">
        <Text className="mb-2 font-bold text-white">
          Versículo do Dia • {formatDate(dailyVerse.date)}
        </Text>
        <Text className="mb-4 text-lg italic text-white">
          "{dailyVerse.verse}"
        </Text>
        <Text className="text-right font-bold text-white">
          — {dailyVerse.reference}
        </Text>
      </View>
    </View>
  );
};

export default DailyVerse;
