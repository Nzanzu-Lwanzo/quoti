import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/api/user/user.service";
import { generateDefaultPasswordForOAuth, generateSecurePassword } from "src/lib/passwordHandlers";
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        private config: ConfigService,
        private authService: AuthenticationService,
        private userService: UserService
    ) {
        super({
            clientID: config.getOrThrow('google.clientID'),
            clientSecret: config.getOrThrow('google.clientSecret'),
            callbackURL: config.getOrThrow('google.callbackURL'),
            scope: ['email', 'profile']
        })
    }


    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {

        const name = profile.displayName;
        const email = profile.emails![0].value;
        const password = await generateDefaultPasswordForOAuth()

        const { id, name: username } = await this.userService.findUserByEmail(email) || await this.authService.register({
            name,
            email,
            password: await generateSecurePassword(password)
        })

        done(null, {
            id,
            username,
            password,
            accessToken,
            refreshToken
        })
    }



}