import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID, MaxLength } from 'class-validator';

export class CreateQuoteDto {
    @ApiProperty({
        description: 'The text content of the quote',
        example: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
        maxLength: 3000
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(3000)
    text: string;

    @ApiProperty({
        description: 'ID of the book this quote is from',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    })
    @IsUUID()
    @IsNotEmpty()
    reference: string;

    @ApiProperty({
        description: 'ID of the user who uploaded this quote',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    })
    @IsUUID()
    @IsNotEmpty()
    uploader: string;

    @ApiPropertyOptional({
        description: 'Array of category IDs this quote belongs to',
        type: [String],
        example: ['550e8400-e29b-41d4-a716-446655440000']
    })
    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    categories?: string[];
}

export class UpdateQuoteDto {
    @ApiPropertyOptional({
        description: 'The text content of the quote',
        example: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
        maxLength: 3000
    })
    @IsString()
    @IsOptional()
    @MaxLength(3000)
    text?: string;

    @ApiPropertyOptional({
        description: 'ID of the book this quote is from',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    })
    @IsUUID()
    @IsOptional()
    bookId?: string;

    @ApiPropertyOptional({
        description: 'Array of category IDs this quote belongs to',
        type: [String],
        example: ['550e8400-e29b-41d4-a716-446655440000']
    })
    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    categoryIds?: string[];
}

