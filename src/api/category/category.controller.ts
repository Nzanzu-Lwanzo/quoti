import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from "./category.dto";
import { UpdateCategoryDto } from './category.dto';
import { formatResponseData } from 'src/lib/formatters';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  // CREATE
  @Post()
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryService.create(createCategoryDto);
    return formatResponseData(createdCategory)
  }

  // GET ALL
  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return formatResponseData(categories)
  }

  // GET CATEGORY WITH ALL ASSOCIATED QUOTES
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    const category = await this.categoryService.findOne(id)

    if (!category) {
      throw new NotFoundException(`Category with <id : ${id}> not found`)
    }

    return formatResponseData(category)
  }

  // UPDATE
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.update(+id, updateCategoryDto);
    return formatResponseData(updatedCategory)
  }

  // DELETE ONE
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
  }
}
