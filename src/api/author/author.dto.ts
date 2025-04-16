import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateAuthorDto {
    @IsString({ message: "Must provide a valid <name> : <type : string>" })
    @IsNotEmpty({ message: "<name> can't be empty or null" })
    name: string

    @IsOptional()
    @IsString({ message: "Must provide a valid <bio> : <type : string>" })
    @Length(32, 1024, { message: "<bio> must be 32 chars min and 1024 chars max length" })
    bio?: string
}
export class UpdateAuthorDto extends PartialType(CreateAuthorDto) { }

export const AUTHOR_FIELDS = ['name', 'bio']