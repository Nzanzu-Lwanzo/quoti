import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { doesPasswordsMatch } from 'src/lib/passwordHandlers';
import { JwtService } from '@nestjs/jwt';


type AuthenticationResultType = {
    data:
    'USER_WITH_EMAIL_NOT_FOUND' |
    'PASSWORD_NO_MATCH' |
    {
        token: string,
        user: {
            id: string,
            name: string | null,
            email: string
        }
    }
}

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async authenticate(
        authData: Pick<User, "email" | "password">
    ): Promise<AuthenticationResultType> {

        const user = await this.userService.findUserByEmail(authData.email)

        if (!user) return { data: 'USER_WITH_EMAIL_NOT_FOUND' }
        const passwordsMatch = await doesPasswordsMatch(authData.password, user.password)

        if (!passwordsMatch) return { data: "PASSWORD_NO_MATCH" }

        return {
            data: {
                token: await this.generateToken({
                    id: user.id,
                    email: user.email
                }),
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }

        }
    }

    private async generateToken(data: { id: string, email: string }) {
        const payload = {
            sub: data.id,
            email: data.email
        }

        const accessToken = await this.jwtService.signAsync(payload)

        return accessToken
    }

}
