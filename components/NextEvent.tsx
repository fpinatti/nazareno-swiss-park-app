import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import scheduleData from '../data/schedule.json';

interface Service {
  id: string;
  day: number; // 0-6 (Sunday-Saturday)
  dayName: string;
  time: string; // HH:mm
  label: string;
}

const NextEvent = () => {
  const [nextService, setNextService] = useState<Service | null>(null);

  useEffect(() => {
    const findNextService = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeValue = currentHours * 60 + currentMinutes;

      // Ensure data is typed correctly
      const schedule: Service[] = scheduleData as Service[];

      // Sort services by day and time
      const sortedServices = [...schedule].sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        return a.time.localeCompare(b.time);
      });

      // 1. Check for later today
      const todayServices = sortedServices.filter((s) => s.day === currentDay);
      const nextToday = todayServices.find((s) => {
        const [h, m] = s.time.split(':').map(Number);
        const serviceTimeValue = h * 60 + m;
        return serviceTimeValue > currentTimeValue;
      });

      if (nextToday) {
        setNextService(nextToday);
        return;
      }

      // 2. Check for next days this week
      const nextDayService = sortedServices.find((s) => s.day > currentDay);
      if (nextDayService) {
        setNextService(nextDayService);
        return;
      }

      // 3. Loop back to start of week
      if (sortedServices.length > 0) {
        setNextService(sortedServices[0]);
      }
    };

    findNextService();
    // Refresh every minute to stay accurate
    const interval = setInterval(findNextService, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!nextService) return null;

  return (
    <View className="flex-1 items-center justify-center border-r border-gray-200 dark:border-gray-600">
      <Text className="text-lg font-bold text-slate-800 dark:text-white">
        {nextService.time}
      </Text>
      <Text className="text-center text-xs uppercase text-slate-500 dark:text-gray-500">
        {nextService.dayName}
      </Text>
      <Text className="text-center text-xs uppercase text-slate-500 dark:text-gray-400">
        {nextService.label}
      </Text>
    </View>
  );
};

export default NextEvent;
