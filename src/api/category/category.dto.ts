import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'The tag or name of the category',
        example: 'Inspiration',
        maxLength: 64,
        minLength: 3
    })
    @IsString({ message: "Must provide a valid <tag> : <type : string>" })
    @Length(3, 64, { message: "<tag> must be 3 chars min and 64 chars max length" })
    tag: string;

    @ApiPropertyOptional({
        description: 'A description of the category',
        example: 'Quotes that inspire and motivate',
        maxLength: 1024,
        minLength: 3
    })
    @IsString({ message: "Must provide a valid <description> : <type : string>" })
    @Length(3, 1024, { message: "<description> must be 3 chars min and 1024 chars max length" })
    @IsOptional()
    description?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }

