export interface VersesList {
    events: Verses[]
}

export interface Verse {
    id: string,
    title: string,
    content: string,
    excerpt: string,
    date: string,
    uri: string,
    versiculos: {
      data: string
    },
    featuredImage: {
        node: {
            sourceUrl: string
        }
    }   
}