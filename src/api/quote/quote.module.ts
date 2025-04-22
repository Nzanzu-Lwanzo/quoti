import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  imports: [DatabaseModule, JwtModule]
})
export class QuoteModule { }
