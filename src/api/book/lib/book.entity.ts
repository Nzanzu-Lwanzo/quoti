import { Author } from "src/api/author/author.entity";

export class Book {
    id: string;
    title: string;
    sum?: string;
    image?: string;
    publishYear?: number;
    publishingHouse?: string;
    publishingTown?: string;
    edition?: string;
    authors: Author[];
    quotes: any[] // This should be an array of quotes
}