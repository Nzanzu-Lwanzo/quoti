import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: "Must provide a valid <name> : <type : string>" })
    @MaxLength(64, { message: "<name> must be 256 chars max length" })
    @IsOptional()
    name: string;

    @IsString({ message: "Must provide a valid <email> : <type : string>" })
    @IsEmail({}, { message: "Must provide a valid email (ex:xyz@dom.com" })
    @IsOptional()
    email: string;

    @IsString({ message: "Must provide a valid <password> : <type : string>" })
    @IsNotEmpty({ message: "<password> can't be empty or null" })
    @IsStrongPassword({ minLength: 6, minLowercase: 2, minNumbers: 2, minUppercase: 1, minSymbols: 1 }, { message: "The password is not strong enough (mix lowercase, numbers, symbols and uppercase)" })
    password: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) { }

