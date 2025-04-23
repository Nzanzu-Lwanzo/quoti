import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from 'src/api/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google.guard';

@Module({
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    GoogleStrategy,
    GoogleAuthGuard
  ],
  controllers: [AuthenticationController],
  imports: [UserModule, JwtModule.register({
    secret: process.env.SECRET,
    global: true,
    signOptions: {
      expiresIn: '1h' // Expires in 1 (one) hour ->  Not working
    }
  })]
})
export class AuthenticationModule { }
