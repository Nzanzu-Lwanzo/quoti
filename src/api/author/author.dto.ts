import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, Length, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
    @IsString({ message: "Must provide a valid <name> : <type : string>" })
    @IsNotEmpty({ message: "<name> can't be empty or null" })
    @ApiProperty({ example: "name of the author", nullable: false, type: 'string' })
    name: string

    @IsOptional()
    @IsString({ message: "Must provide a valid <bio> : <type : string>" })
    @Length(32, 1024, { message: "<bio> must be 32 chars min and 1024 chars max length" })
    @ApiProperty({ example: "bio of the author (optional)", nullable: true, type: 'string' })
    bio?: string
}
export class UpdateAuthorDto extends PartialType(CreateAuthorDto) { }

export const AUTHOR_FIELDS = ['name', 'bio']