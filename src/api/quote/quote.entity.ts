import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../book/lib/book.entity';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

export class Quote {
    @ApiProperty({
        description: 'Unique identifier of the quote',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    })
    id: string;

    @ApiProperty({
        description: 'The text content of the quote',
        example: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
        maxLength: 3000
    })
    text: string;

    @ApiProperty({
        description: 'The book this quote is from',
        type: Book
    })
    reference: Book;

    @ApiProperty({
        description: 'Array of categories this quote belongs to',
        type: [Category]
    })
    categories: Category[];

    @ApiProperty({
        description: 'The user who uploaded this quote',
        type: User
    })
    uploader: User;

    @ApiProperty({
        description: 'Array of users who upvoted this quote',
        type: [User]
    })
    upvotes: User[];

    @ApiProperty({
        description: 'Count of upvotes for this quote',
        example: 42,
        type: Number
    })
    _count: {
        upvotes: number;
    };
} 