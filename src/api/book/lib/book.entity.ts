import { Author } from "@prisma/client";

export class Book {
    id: string;
    title: string;
    sum?: string;
    publishYear?: number;
    publishingHouse?: string;
    publishingTown?: string;
    edition?: string;
    authors: Author[];
    quotes: any[] // This should be an array of quotes
}