import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNumber, Length, MaxLength, IsPositive, IsNotEmpty, IsNumberString, IsArray, IsEmpty } from 'class-validator';

export class CreateBookDto {
    @IsString({ message: "Must provide a valid <title> : <type : string>" })
    @IsNotEmpty({ message: "<title> can't be empty or null" })
    @MaxLength(1024, { message: "<title> must be 1024 chars max length" })
    title: string;

    @IsString({ message: "Must provide a valid <sum> : <type : string>" })
    @IsOptional()
    sum?: string;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsPositive({ message: "Must be a positive number" })
    @IsOptional()
    publishYear?: number;

    @IsString({ message: "Must provide a valid <publishingHouse> : <type : string>" })
    @MaxLength(256, { message: "<publishingHouse> must be 256 chars max length" })
    @IsOptional()
    publishingHouse?: string;

    @IsString({ message: "Must provide a valid <publishingTown> : <type : string>" })
    @MaxLength(256, { message: "<publishingTown> must be 256 chars max length" })
    @IsOptional()
    publishingTown?: string;

    @IsNumberString({ no_symbols: true })
    @IsOptional()
    edition?: string;

    @IsArray({ message: "Must be an array of <author.id>" })
    @IsNotEmpty({ message: "<authors> can't be empty or null" })
    authors: string[]
}
export class UpdateBookDto extends PartialType(CreateBookDto) { }

