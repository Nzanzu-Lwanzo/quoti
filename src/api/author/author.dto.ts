import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, Length, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthorDto {
    @ApiProperty({
        description: 'The full name of the author',
        example: 'F. Scott Fitzgerald',
        maxLength: 256,
        type: String
    })
    @IsString({ message: "Must provide a valid <name> : <type : string>" })
    @IsNotEmpty({ message: "<name> can't be empty or null" })
    @MaxLength(256, { message: "<name> must be 256 chars max length" })
    name: string

    @ApiPropertyOptional({
        description: 'A biography or description of the author',
        example: 'Francis Scott Key Fitzgerald was an American novelist, essayist, and short story writer. He is best known for his novels depicting the flamboyance and excess of the Jazz Age.',
        minLength: 32,
        maxLength: 1024,
        type: String
    })
    @IsOptional()
    @IsString({ message: "Must provide a valid <bio> : <type : string>" })
    @Length(32, 1024, { message: "<bio> must be 32 chars min and 1024 chars max length" })
    bio?: string

    @ApiPropertyOptional({
        description: 'URL to the author\'s profile image',
        example: 'https://example.com/images/fitzgerald.jpg',
        type: String,
        format: 'uri'
    })
    @IsOptional()
    @IsUrl({}, { message: "Must provide a valid URL for <image>" })
    image?: string
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) { }

export const AUTHOR_FIELDS = ['name', 'bio', 'image'] as const