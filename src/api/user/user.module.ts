import { Module } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';

@ApiExcludeController()
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports : [DatabaseModule],
  exports : [UserService]
})
export class UserModule {}
