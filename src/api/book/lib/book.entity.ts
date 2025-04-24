import { Author } from "src/api/author/author.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Book {
    @ApiProperty({
        description: 'Unique identifier of the book',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    })
    id: string;

    @ApiProperty({
        description: 'The title of the book',
        example: 'The Great Gatsby',
        maxLength: 1024
    })
    title: string;

    @ApiProperty({
        description: 'A summary or description of the book',
        example: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
        required: false
    })
    sum?: string;

    @ApiProperty({
        description: 'URL or path to the book cover image',
        example: 'https://example.com/images/great-gatsby.jpg',
        required: false
    })
    image?: string;

    @ApiProperty({
        description: 'The year the book was published',
        example: 1925,
        type: Number,
        minimum: 1,
        required: false
    })
    publishYear?: number;

    @ApiProperty({
        description: 'The publishing house that released the book',
        example: 'Charles Scribner\'s Sons',
        maxLength: 256,
        required: false
    })
    publishingHouse?: string;

    @ApiProperty({
        description: 'The town where the book was published',
        example: 'New York',
        maxLength: 256,
        required: false
    })
    publishingTown?: string;

    @ApiProperty({
        description: 'The edition of the book',
        example: '1',
        type: String,
        required: false
    })
    edition?: string;

    @ApiProperty({
        description: 'Array of authors associated with the book',
        type: [Author],
        example: [
            {
                id: '550e8400-e29b-41d4-a716-446655440001',
                name: 'F. Scott Fitzgerald',
                bio: 'American novelist and short story writer'
            }
        ]
    })
    authors: Author[];

    @ApiProperty({
        description: 'Array of quotes from the book',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440002' },
                content: { type: 'string', example: 'So we beat on, boats against the current, borne back ceaselessly into the past.' },
                page: { type: 'number', example: 180 }
            }
        }
    })
    quotes: any[] // This should be an array of quotes
}