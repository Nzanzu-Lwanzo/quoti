import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PUBLIC_API_KEY } from "./auth.decorator";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AuthUserType } from "src/lib/@types";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private jwt: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        // Is public? Pass
        const isPublic = this.checkIsPublicRoute(context)
        if (isPublic) {
            return true
        }

        // Is auth route ? Pass
        const request: Request = context.switchToHttp().getRequest()

        const isAuthRoute = this.checkIsAuthRoute(request)

        if (isAuthRoute) {
            return true
        }

        const authorization = request.headers.authorization
        const token = this.parseAuthorizationHeader(authorization)

        if (!token) {
            throw new UnauthorizedException("Unavailable credentials to access this route")
        }

        try {

            const user = await this.parseToken(token);
            request['user'] = user

            return true

        } catch (e) { console .log(e);return false }

    }

    checkIsPublicRoute(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_API_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        return isPublic
    }

    checkIsAuthRoute(request: Request) {
        const urlPath = request.url;
        return urlPath.startsWith('/api/auth/')
    }

    parseAuthorizationHeader(authorization: string | undefined) {

        const [bearer, token] = authorization?.split(' ') ?? []

        if (bearer !== 'Bearer') {
            return
        }

        return token

    }

    async parseToken(token: string) {

        const parsedToken = await this.jwt.verifyAsync(token, { secret: process.env.SECRET }) as AuthUserType
        return parsedToken

    }

}