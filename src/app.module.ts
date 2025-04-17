import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './api/author/author.module';
import { BookModule } from './api/book/book.module';
import { CategoryModule } from './api/category/category.module';

@Module({
  imports: [DatabaseModule, AuthorModule, BookModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
