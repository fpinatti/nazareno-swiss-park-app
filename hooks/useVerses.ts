import { Verse } from '@/@types/verses';
import { useEffect, useState } from 'react';
import { fetchBibleVersesGraphQL } from '../utils/wpgraphql';

export function useVerses() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadVerses = async () => {
    try {
      setLoading(true);
      const response = await fetchBibleVersesGraphQL();
      setVerses(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVerses();
  }, []);

  return { verses, loading, error, refetch: loadVerses };
}
