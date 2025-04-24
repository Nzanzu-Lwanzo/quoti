import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNumber, Length, MaxLength, IsPositive, IsNotEmpty, IsNumberString, IsArray, IsEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty({
        description: 'The title of the book',
        example: 'The Great Gatsby',
        maxLength: 1024
    })
    @IsString({ message: "Must provide a valid <title> : <type : string>" })
    @IsNotEmpty({ message: "<title> can't be empty or null" })
    @MaxLength(1024, { message: "<title> must be 1024 chars max length" })
    title: string;

    @ApiPropertyOptional({
        description: 'A summary or description of the book',
        example: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.'
    })
    @IsString({ message: "Must provide a valid <sum> : <type : string>" })
    @IsOptional()
    sum?: string;

    @ApiPropertyOptional({
        description: 'The year the book was published',
        example: 1925,
        type: Number,
        minimum: 1
    })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive({ message: "Must be a positive number" })
    @IsOptional()
    publishYear?: number;

    @ApiPropertyOptional({
        description: 'The publishing house that released the book',
        example: 'Charles Scribner\'s Sons',
        maxLength: 256
    })
    @IsString({ message: "Must provide a valid <publishingHouse> : <type : string>" })
    @MaxLength(256, { message: "<publishingHouse> must be 256 chars max length" })
    @IsOptional()
    publishingHouse?: string;

    @ApiPropertyOptional({
        description: 'The town where the book was published',
        example: 'New York',
        maxLength: 256
    })
    @IsString({ message: "Must provide a valid <publishingTown> : <type : string>" })
    @MaxLength(256, { message: "<publishingTown> must be 256 chars max length" })
    @IsOptional()
    publishingTown?: string;

    @ApiPropertyOptional({
        description: 'The edition of the book',
        example: '1',
        type: String
    })
    @IsNumberString({ no_symbols: true })
    @IsOptional()
    edition?: string;

    @ApiProperty({
        description: 'Array of author IDs associated with the book',
        example: ['author-id-1', 'author-id-2'],
        type: [String]
    })
    @IsArray({ message: "Must be an array of <author.id>" })
    @IsNotEmpty({ message: "<authors> can't be empty or null" })
    authors: string[]
}

export class UpdateBookDto extends PartialType(OmitType(CreateBookDto, ['authors'])) { }

