import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './api/author/author.module';

@Module({
  imports: [DatabaseModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
