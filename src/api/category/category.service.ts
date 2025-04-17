import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from "./category.dto";
import { UpdateCategoryDto } from './category.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService {

  constructor(
    private db: DatabaseService
  ) { }

  // GLOBAL VARS
  joinSchema = {
    _count: {
      select: {
        quotes: true
      }
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.db.category.create({ data: createCategoryDto })
    return createdCategory
  }

  async findAll() {
    const categories = await this.db.category.findMany({
      include: this.joinSchema
    })
    return categories
  }

  async findOne(id: number) {
    const category = await this.db.category.findUnique({
      where: {
        id
      },
      include: {
        quotes: true
      }
    })
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.db.category.update({
      where: {
        id
      },
      data: updateCategoryDto,
      include: this.joinSchema
    })
    return updatedCategory
  }

  async remove(id: number) {
    await this.db.category.delete({
      where: {
        id
      }
    })
  }
}
