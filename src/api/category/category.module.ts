import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [DatabaseModule]
})
export class CategoryModule { }
