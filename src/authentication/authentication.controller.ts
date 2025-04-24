import { Controller, Post, Body, ValidationPipe, UseGuards, Request, Response, Get, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiUnauthorizedResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CredentialsDto } from './authentication.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { type Request as ExpressRequest, type Response as ExpressResponse } from 'express';
import { formatResponseData } from 'src/lib/formatters';
import { AuthenticationService } from './authentication.service';
import { AuthUserType } from 'src/lib/@types';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { LoginDto, RegisterDto } from './authentication.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {

    constructor(
        private authService: AuthenticationService
    ) { }

    // LOGIN WITH USERNAME- PASSWORD
    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ 
        summary: 'User login',
        description: 'Authenticates a user and returns a JWT token'
    })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Successfully logged in',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    email: 'user@example.com',
                    name: 'John Doe'
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ 
        description: 'Invalid credentials',
        schema: {
            example: {
                statusCode: 401,
                message: 'Invalid credentials',
                error: 'Unauthorized'
            }
        }
    })
    async login(
        @Response({ passthrough: true }) response: ExpressResponse,
        @Request() request: ExpressRequest,
        @Body(ValidationPipe) credentials: CredentialsDto
    ) {
        const user = request.user as AuthUserType
        const accessToken = await this.authService.generateTokens(user)
        response.setHeader('Authorization', accessToken)
        return formatResponseData(user)
    }

    // LOGOUT
    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(
        @Response({ passthrough: true }) response: ExpressResponse,
        @Request() request: ExpressRequest,
    ) {
        response.removeHeader('authorization')
        return formatResponseData(null)
    }

    // LOGIN WITH GOOGLE
    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    async loginWithGoogle() { }

    // GOOGLE AUTH CALLBACK
    @Get('/callback/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthCallBack(
        @Request() request: ExpressRequest
    ) {
        return formatResponseData(request.user)
    }
    
    // CREATE A NEW USER ACCOUNT
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ 
        summary: 'User registration',
        description: 'Creates a new user account and returns a JWT token'
    })
    @ApiBody({ type: RegisterDto })
    @ApiCreatedResponse({ 
        description: 'User successfully registered',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    email: 'user@example.com',
                    name: 'John Doe'
                }
            }
        }
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Bad request - Invalid input data',
        schema: {
            example: {
                statusCode: 400,
                message: ['email must be a valid email', 'password must be at least 8 characters'],
                error: 'Bad Request'
            }
        }
    })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
