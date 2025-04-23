import { Author } from "src/api/author/author.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Book {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    sum?: string;
    @ApiProperty()
    image?: string;
    @ApiProperty()
    publishYear?: number;
    @ApiProperty()
    publishingHouse?: string;
    @ApiProperty()
    publishingTown?: string;
    @ApiProperty()
    edition?: string;
    @ApiProperty({ isArray: true, type: Author })
    authors: Author[];
    @ApiProperty()
    quotes: any[] // This should be an array of quotes
}