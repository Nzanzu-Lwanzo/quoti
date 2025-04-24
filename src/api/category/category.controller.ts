import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from "./category.dto";
import { UpdateCategoryDto } from './category.dto';
import { formatResponseData } from 'src/lib/formatters';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { Category } from './category.entity';
import { getErrorResponseShape } from 'src/lib/helpers';

@ApiTags('Categories')
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiOperation({ 
    summary: 'Create a new category',
    description: 'Creates a new category with the provided tag and optional description. The tag must be unique and between 3-64 characters. Description is optional but must be 3-1024 characters if provided.'
  })
  @ApiBody({ 
    type: CreateCategoryDto,
    description: 'Category creation data including tag and optional description'
  })
  @ApiCreatedResponse({ 
    description: 'The category has been successfully created',
    type: Category
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request - Invalid input data. Possible reasons: tag too short (<3 chars), tag too long (>64 chars), description too short (<3 chars), description too long (>1024 chars), or duplicate tag',
    schema: { example: getErrorResponseShape(400) }
  })
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryService.create(createCategoryDto);
    return formatResponseData(createdCategory)
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all categories',
    description: 'Retrieves a list of all categories with their associated quote counts'
  })
  @ApiOkResponse({ 
    description: 'Categories retrieved successfully',
    type: [Category]
  })
  async findAll() {
    const categories = await this.categoryService.findAll();
    return formatResponseData(categories)
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a category by ID',
    description: 'Retrieves detailed information about a specific category, including all associated quotes'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Unique identifier of the category',
    type: Number,
    example: 1
  })
  @ApiOkResponse({ 
    description: 'Category retrieved successfully',
    type: Category
  })
  @ApiNotFoundResponse({ 
    description: 'Category not found - The specified category ID does not exist',
    schema: { example: getErrorResponseShape(404) }
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    const category = await this.categoryService.findOne(id)

    if (!category) {
      throw new NotFoundException(`Category with <id : ${id}> not found`)
    }

    return formatResponseData(category)
  }

  @Patch('/add')
  @ApiOperation({ 
    summary: 'Add a quote to a category',
    description: 'Associates a quote with a category'
  })
  @ApiQuery({ 
    name: 'quote', 
    description: 'UUID of the quote to add',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiQuery({ 
    name: 'categ', 
    description: 'ID of the category to add the quote to',
    type: Number,
    example: 1
  })
  @ApiOkResponse({ 
    description: 'Quote successfully added to category',
    type: Category
  })
  @ApiNotFoundResponse({ 
    description: 'Category or quote not found',
    schema: { example: getErrorResponseShape(404) }
  })
  async addQuoteToCategory(
    @Query('quote') quoteId: string,
    @Query('categ', ParseIntPipe) categoryId: number
  ) {
    const updatedCategory = await this.categoryService.addQuoteToCategory(quoteId, categoryId)
    return formatResponseData(updatedCategory)
  }

  @Patch('/remove')
  @ApiOperation({ 
    summary: 'Remove a quote from a category',
    description: 'Removes a quote from a category'
  })
  @ApiQuery({ 
    name: 'quote', 
    description: 'UUID of the quote to remove',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiQuery({ 
    name: 'categ', 
    description: 'ID of the category to remove the quote from',
    type: Number,
    example: 1
  })
  @ApiOkResponse({ 
    description: 'Quote successfully removed from category',
    type: Category
  })
  @ApiNotFoundResponse({ 
    description: 'Category or quote not found',
    schema: { example: getErrorResponseShape(404) }
  })
  async removeQuoteToCategory(
    @Query('quote') quoteId: string,
    @Query('categ', ParseIntPipe) categoryId: number
  ) {
    const updatedCategory = await this.categoryService.removeQuoteFromCategory(quoteId, categoryId)
    return formatResponseData(updatedCategory)
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a category',
    description: 'Updates the information of an existing category. All fields are optional - only include the fields you want to update.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Unique identifier of the category to update',
    type: Number,
    example: 1
  })
  @ApiBody({ 
    type: UpdateCategoryDto,
    description: 'Updated category data. Only include the fields you want to update.'
  })
  @ApiOkResponse({ 
    description: 'Category updated successfully',
    type: Category
  })
  @ApiNotFoundResponse({ 
    description: 'Category not found - The specified category ID does not exist',
    schema: { example: getErrorResponseShape(404) }
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request - Invalid input data. Possible reasons: tag too short (<3 chars), tag too long (>64 chars), description too short (<3 chars), description too long (>1024 chars), or duplicate tag',
    schema: { example: getErrorResponseShape(400) }
  })
  async update(@Param('id') id: string, @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.update(+id, updateCategoryDto);
    return formatResponseData(updatedCategory)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ 
    summary: 'Delete a category',
    description: 'Permanently deletes a category from the system. This action cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Unique identifier of the category to delete',
    type: Number,
    example: 1
  })
  @ApiNoContentResponse({ 
    description: 'Category was successfully deleted'
  })
  @ApiNotFoundResponse({ 
    description: 'Category not found - The specified category ID does not exist',
    schema: { example: getErrorResponseShape(404) }
  })
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
  }
}
