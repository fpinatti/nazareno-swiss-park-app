import { Event } from '@/@types/events';
import { useEffect, useState } from 'react';
import { fetchEventsGraphQL } from '../utils/wpgraphql';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await fetchEventsGraphQL();
      setEvents(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return { events, loading, error, refetch: loadEvents };
}
