export interface EventList {
    events: Event[]
}

export interface Event {
    id: string,
    title: string,
    content: string,
    excerpt: string,
    date: string,
    uri: string,
    featuredImage: {
        node: {
            sourceUrl: string
        }
    },
    eventos: {
        data: string,
        local: string
    },
    categories: {
        nodes: []
    }   
}