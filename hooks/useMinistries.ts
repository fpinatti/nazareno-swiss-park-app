import { Ministry } from '@/@types/ministries';
import { useEffect, useState } from 'react';
import { fetchMinistriesGraphQL } from '../utils/wpgraphql';

export function useMinistries() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadMinistries = async () => {
    try {
      setLoading(true);
      const response = await fetchMinistriesGraphQL();
      setMinistries(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMinistries();
  }, []);

  return { ministries, loading, error, refetch: loadMinistries };
}
