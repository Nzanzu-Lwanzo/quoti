import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, ArrayNotEmpty, IsNumber, IsUUID, IsArray, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateQuoteDto {
    @IsString({ message: "Must provide a valid <text> : <type : string>" })
    @IsNotEmpty({ message: "<text> can't be empty or null" })
    @MaxLength(3000, { message: "<text> must be 3000 chars max length" })
    text: string;

    @IsUUID(4, { message: "Must provide a valid <reference> : <type : uuid>" })
    @IsNotEmpty({ message: "<reference> can't be empty or null" })
    reference: string;

    @IsArray({ message: "Must provide a valid <categories> : <type : number[]>" })
    @ArrayNotEmpty({ message: "<categories> can't be empty" })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { each: true, message: "All the elements of <categories> must be <id :number>" })
    categories: number[]

    @IsString({ message: "Must provide a valid <uploader> : <type : string>" })
    @IsUUID(4, { message: "Must provide a valid <uploader> : <type : uuid>" })
    uploader: string
}
export class UpdateQuoteDto extends PartialType(OmitType(CreateQuoteDto, ['categories', 'uploader'])) { }

