import { ApiProperty } from "@nestjs/swagger";

export class Category {
    @ApiProperty({
        description: 'Unique identifier of the category',
        example: 1,
        type: Number
    })
    id: number;

    @ApiProperty({
        description: 'The tag or name of the category',
        example: 'Inspiration',
        maxLength: 64,
        minLength: 3
    })
    tag: string;

    @ApiProperty({
        description: 'A description of the category',
        example: 'Quotes that inspire and motivate',
        maxLength: 1024,
        minLength: 3,
        required: false
    })
    description?: string;

    @ApiProperty({
        description: 'Count of quotes associated with the category',
        example: {
            quotes: 25
        },
        type: 'object',
        properties: {
            quotes: {
                type: 'number',
                description: 'Number of quotes in this category',
                example: 25
            }
        }
    })
    _count: {
        quotes: number
    }
} 