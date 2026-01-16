import { Event } from '@/@types/events';
import { Ministry } from '@/@types/ministries';
import { GraphQLClient, gql } from 'graphql-request';

const GRAPHQL_URL = process.env.EXPO_PUBLIC_WORDPRESS_GRAPHQL_URL || '';

export const client = new GraphQLClient(GRAPHQL_URL);

/**
 * Query for events. 
 */
const GET_EVENTS_QUERY = gql`
  query GetEvents {
    posts(where: { categoryName: "NSP_EVENTOS" }) {
      nodes {
        id
        title
        excerpt
        content
        date
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        eventos {
          data
          local
        }
      }
    }
  }
`;

export const fetchEventsGraphQL = async (): Promise<Event[] | []> => {
  if (!GRAPHQL_URL) {
    console.error('EXPO_PUBLIC_WORDPRESS_GRAPHQL_URL is not defined');
    return [];
  }

  try {
    const data: any = await client.request(GET_EVENTS_QUERY);
    
    return data.posts.nodes.map((node: Event) => ({
      id: node.id,
      title: node.title,
      // location: node.eventos.local || null,
      // date: new Date(node.eventos.data).toLocaleDateString('pt-BR') || null,
      // time: new Date(node.eventos.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) || null,
      excerpt: node.excerpt || null,
      content: node.content || null,
      eventos: {
        data: node.eventos.data || null,
        local: node.eventos.local || null
      },
      featuredImage: {
        node: {
          sourceUrl: node.featuredImage?.node?.sourceUrl || null
        }
      },
      // imageUrl: node.featuredImage?.node?.sourceUrl || null,
      // tags: node.categories.nodes.map((cat: any) => cat.slug),
    }));
  } catch (error) {
    console.error('Error fetching events via WPGraphQL:', error);
    return []
  }
};




/**
 * Query for events. 
 */
const GET_MINISTRIES_QUERY = gql`
  query GetMinistries {
    posts(where: { categoryName: "NSP_MINISTERIOS" }) {
      nodes {
        id
        title
        excerpt
        content
        date
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const fetchMinistriesGraphQL = async (): Promise<Ministry[] | []> => {
  if (!GRAPHQL_URL) {
    console.error('EXPO_PUBLIC_WORDPRESS_GRAPHQL_URL is not defined');
    return [];
  }

  try {
    const data: any = await client.request(GET_MINISTRIES_QUERY);
    
    return data.posts.nodes.map((node: Ministry) => ({
      id: node.id,
      title: node.title,
      // location: node.eventos.local || null,
      // date: new Date(node.eventos.data).toLocaleDateString('pt-BR') || null,
      // time: new Date(node.eventos.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) || null,
      excerpt: node.excerpt || null,
      content: node.content || null,
      featuredImage: {
        node: {
          sourceUrl: node.featuredImage?.node?.sourceUrl || null
        }
      },
      // imageUrl: node.featuredImage?.node?.sourceUrl || null,
      // tags: node.categories.nodes.map((cat: any) => cat.slug),
    }));
  } catch (error) {
    console.error('Error fetching ministries via WPGraphQL:', error);
    return []
  }
};
