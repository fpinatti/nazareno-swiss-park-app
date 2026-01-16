export interface MinistryList {
    events: Ministry[]
}

export interface Ministry {
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
    }   
}