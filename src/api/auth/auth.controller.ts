import { BadRequestException, Body, Controller, ForbiddenException, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { formatResponseData } from 'src/lib/formatters';
import { Response as ResponseType } from 'express';

@Controller('api/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/login')
    async login(
        @Body() authData: Pick<User, 'email' | 'password'>,
        @Response({ passthrough: true }) response: ResponseType
    ) {

        const authenticationResult = await this.authService.authenticate(authData)

        if (authenticationResult.data === 'USER_WITH_EMAIL_NOT_FOUND') {
            throw new BadRequestException(`<email> was invalid or no user is associated with it`)
        }

        if (authenticationResult.data === 'PASSWORD_NO_MATCH') {
            throw new BadRequestException(`<password> did not match the hash`)
        }

        response.setHeader('Authorization', `Bearer ${authenticationResult.data.token}`)

        return formatResponseData(authenticationResult.data)
    }
}
