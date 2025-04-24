import { Book } from "../book/lib/book.entity"
import { ApiProperty } from "@nestjs/swagger"

export class Author {
    @ApiProperty({
        description: 'Unique identifier of the author',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    })
    id: string
    @ApiProperty({
        description: 'The full name of the author',
        example: 'F. Scott Fitzgerald',
        maxLength: 256,
        type: String
    })
    name: string
    @ApiProperty({
        description: 'URL to the author\'s profile image',
        example: 'https://example.com/images/fitzgerald.jpg',
        type: String,
        format: 'uri',
        required: false
    })
    image?: string
    @ApiProperty({
        description: 'A biography or description of the author',
        example: 'Francis Scott Key Fitzgerald was an American novelist, essayist, and short story writer. He is best known for his novels depicting the flamboyance and excess of the Jazz Age.',
        minLength: 32,
        maxLength: 1024,
        type: String,
        required: false
    })
    bio?: string
    @ApiProperty({
        description: 'Count of books associated with the author',
        example: {
            books: 5
        },
        type: 'object',
        properties: {
            books: {
                type: 'number',
                description: 'Number of books written by this author',
                example: 5
            }
        }
    })
    _count: {
        books: number
    }
}