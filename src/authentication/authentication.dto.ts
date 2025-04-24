import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/api/user/user.dto";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CredentialsDto extends PickType(CreateUserDto, ['email', 'password']) { }

export class LoginDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'password123',
        minLength: 8
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class RegisterDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'password123',
        minLength: 8
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({
        description: 'User name',
        example: 'John Doe',
        minLength: 3,
        maxLength: 64
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}