import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  imports: [DatabaseModule]
})
export class QuoteModule { }
