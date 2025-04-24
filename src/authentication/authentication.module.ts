import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserModule } from '../api/user/user.module';
import configuration from '../configuration';
import { DatabaseModule } from 'src/database/database.module';

@ApiTags('Authentication')
@Module({
  imports: [
    UserModule,
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy
  ],
  exports: [AuthenticationService]
})
export class AuthenticationModule { }
