import { useVerses } from '@/hooks/useVerses';
import { htmlToText } from '@/utils/converter';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

const DailyVerse = () => {

  const { verses, loading, error } = useVerses();

  const dailyVerse = useMemo(() => {
    if (verses.length === 0) return null;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const todayStr = `${year}-${month}-${day}`;
    const todayMMDD = `${month}-${day}`;

    // Helper to get normalized date string (YYYY-MM-DD) from API's date
    const getNormalizedDate = (v: any) => {
      const dateStr = v.versiculos?.data;
      if (!dateStr) return '';
      // Handle ISO format "YYYY-MM-DDTHH:MM:SS..." or already "YYYY-MM-DD"
      return dateStr.split('T')[0];
    };

    // 1. Try exact YYYY-MM-DD match
    const exactMatch = verses.find((v) => getNormalizedDate(v) === todayStr);
    if (exactMatch) return exactMatch;

    // 2. Try MM-DD match (ignoring year) - Great for testing or recurring verses
    // We sort by year descending to get the most recent year's version of today
    const calendarMatches = verses
      .filter((v) => getNormalizedDate(v).endsWith(todayMMDD))
      .sort((a, b) => getNormalizedDate(b).localeCompare(getNormalizedDate(a)));

    if (calendarMatches.length > 0) return calendarMatches[0];

    // 3. Fallback: Latest verse that is NOT in the future
    const sortedVerses = [...verses].sort((a, b) =>
      getNormalizedDate(b).localeCompare(getNormalizedDate(a)),
    );

    const pastOrTodayVerses = sortedVerses.filter((v) => getNormalizedDate(v) <= todayStr);
    if (pastOrTodayVerses.length > 0) {
      return pastOrTodayVerses[0];
    }

    // 4. Absolute fallback: the highest date in the file (if everything is technically "future")
    return sortedVerses[0];
  }, [verses]);

  if (!dailyVerse) return null;

  return (
    <View className="mb-8 mt-4 px-4">
      <View className="rounded-lg bg-blue-900 p-6">
        <Text className="mb-2 font-bold text-white">
          Versículo do Dia
        </Text>
        <Text className="mb-4 text-lg italic text-white">
          "{htmlToText(dailyVerse?.content)}"
        </Text>
        <Text className="text-right font-bold text-white">
          — {dailyVerse?.title}
        </Text>
      </View>
    </View>
  );
};

export default DailyVerse;
