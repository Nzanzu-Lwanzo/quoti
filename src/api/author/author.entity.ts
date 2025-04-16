export class Author {
    id: string
    name: string
    bio?: string
    books: any[] // This should be an array of Book entities objects
}