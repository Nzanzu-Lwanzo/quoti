import { Book } from "../book/lib/book.entity"

export class Author {
    id: string
    name: string
    image?: string
    bio?: string
    books: Book[]
}