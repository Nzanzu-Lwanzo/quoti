import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/api/user/user.service';
import { AuthUserType } from 'src/lib/@types';
import { doesPasswordsMatch } from 'src/lib/passwordHandlers';
import { RegisterDto } from './authentication.dto';
import { DatabaseService } from 'src/database/database.service';
import { generateSecurePassword } from 'src/lib/passwordHandlers';

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private db: DatabaseService
    ) { }

    async validateUser({ email, password }: { email: string, password: string }): Promise<AuthUserType | undefined> {

        const user = await this.userService.findUserByEmail(email)
        if (!user) return

        const passwordsMatch = await doesPasswordsMatch(password, user.password)
        if (!passwordsMatch) return

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    async generateTokens({ id, email, name }: AuthUserType) {
        const accessToken = await this.jwtService.signAsync({ sub: id, email, name })
        return accessToken
    }

    async register(registerDto: RegisterDto) {

        const securePassword = await generateSecurePassword(registerDto.password)
        const createdUser = await this.db.user.create({
            data: {
                ...registerDto,
                password: securePassword
            }
        })

        return createdUser
    }
}
