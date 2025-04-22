import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './api/author/author.module';
import { BookModule } from './api/book/book.module';
import { CategoryModule } from './api/category/category.module';
import { QuoteModule } from './api/quote/quote.module';
import { UserModule } from './api/user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    DatabaseModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    QuoteModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
