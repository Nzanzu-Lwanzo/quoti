import { Book } from "@prisma/client"

export class Author {
    id: string
    name: string
    bio?: string
    books: Book[]
}