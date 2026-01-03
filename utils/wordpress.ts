const BASE_URL = process.env.EXPO_PUBLIC_WORDPRESS_BASEURL || '';

interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  [key: string]: any;
}

export const fetchPosts = async (page = 1, per_page = 5): Promise<WPPost[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/posts?page=${page}&per_page=${per_page}`,
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const fetchEvents = async (): Promise<any[]> => {
  // Try to fetch from a custom endpoint or category
  try {
    // Example: Fetch from category 'events' (id 5 usually, depends on WP setup)
    // Or custom post type 'event' -> /wp/v2/event
    const response = await fetch(
      `${BASE_URL}/posts?categories=EVENTS_CATEGORY_ID`,
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const fetchVerseOfDay = async () => {
  // Maybe fetch from a specific plugin endpoint or services like BibleAPI
  // Implementation depends on backend
  return {
    text: 'Entregue o seu caminho ao Senhor; confie nele, e Ele agirá.',
    reference: 'Salmos 37:5',
  };
};
