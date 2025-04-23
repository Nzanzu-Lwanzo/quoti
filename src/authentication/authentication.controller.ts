import { Controller, Post, Body, ValidationPipe, UseGuards, Request, Response, Get } from '@nestjs/common';
import { CredentialsDto } from './authentication.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { type Request as ExpressRequest, type Response as ExpressResponse } from 'express';
import { formatResponseData } from 'src/lib/formatters';
import { AuthenticationService } from './authentication.service';
import { AuthUserType } from 'src/lib/@types';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthenticationController {

    constructor(
        private authService: AuthenticationService
    ) { }

    @Post('/login')
    @UseGuards(LocalAuthGuard)
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

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(
        @Response({ passthrough: true }) response: ExpressResponse,
        @Request() request: ExpressRequest,
    ) {
        response.removeHeader('authorization')
        return formatResponseData(null)
    }

    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    async loginWithGoogle() { }

    @Get('/callback/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthCallBack(
        @Request() request: ExpressRequest
    ) {
        return formatResponseData(request.user)
    }
}
