import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
    @IsString({ message: "Must provide a valid <tag> : <type : string>" })
    @Length(3, 64, { message: "<tag> must be 3 chars min and 64 chars max length" })
    tag: string;

    @IsString({ message: "Must provide a valid <description> : <type : string>" })
    @Length(3, 1024, { message: "<tag> must be 3 chars min and 1024 chars max length" })
    @IsOptional()
    description?: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }

