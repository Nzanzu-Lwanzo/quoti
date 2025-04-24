import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException, HttpCode, UseGuards, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from "./quote.dto";
import { UpdateQuoteDto } from './quote.dto';
import { formatResponseData } from 'src/lib/formatters';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { Quote } from './quote.entity';
import { getErrorResponseShape } from 'src/lib/helpers';

@ApiTags('Quotes')
@Controller('api/quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) { }

  @Post()
  @ApiOperation({ 
    summary: 'Create a new quote',
    description: 'Creates a new quote with the provided text, book reference, categories, and uploader information. The text must be between 1 and 3000 characters, and the quote must be associated with at least one category.'
  })
  @ApiBody({ 
    type: CreateQuoteDto,
    description: 'Quote creation data including text, book reference, categories, and uploader information'
  })
  @ApiCreatedResponse({ 
    description: 'The quote has been successfully created',
    type: Quote
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request - Invalid input data. Possible reasons: empty text, text too long (>3000 chars), invalid book reference, invalid category IDs, invalid uploader ID, or missing required fields',
    schema: { example: getErrorResponseShape(400) }
  })
  async create(@Body(ValidationPipe) createQuoteDto: CreateQuoteDto) {
    const createdQuote = await this.quoteService.create(createQuoteDto);
    return formatResponseData(createdQuote)
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all quotes',
    description: 'Retrieves a list of all quotes with their associated book, categories, uploader, and upvote information'
  })
  @ApiQuery({ 
    name: 'limit', 
    description: 'Maximum number of quotes to return',
    type: Number,
    required: false,
    example: 10
  })
  @ApiOkResponse({ 
    description: 'Quotes retrieved successfully',
    type: [Quote]
  })
  async findAll(
    @Query('limit') limit?: number,
    @Query('search') search?: string
  ) {
    const quotes = await this.quoteService.findAll({ limit, search });
    return formatResponseData(quotes)
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a quote by ID',
    description: 'Retrieves detailed information about a specific quote, including its book reference, categories, uploader, and upvote information'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Unique identifier of the quote (UUID format)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiOkResponse({ 
    description: 'Quote retrieved successfully',
    type: Quote
  })
  @ApiNotFoundResponse({ 
    description: 'Quote not found - The specified quote ID does not exist',
    schema: { example: getErrorResponseShape(404) }
  })
  async findOne(@Param('id') id: string) {
    const quote = await this.quoteService.findOne(id);

    if (!quote) {
      throw new NotFoundException(`Quote with <id : ${id}> not found`)
    }

    return formatResponseData(quote)
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a quote',
    description: 'Updates the information of an existing quote. Only the text and book reference can be updated. Categories and uploader information cannot be modified through this endpoint.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Unique identifier of the quote to update (UUID format)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiBody({ 
    type: UpdateQuoteDto,
    description: 'Updated quote data. Only text and book reference can be modified.'
  })
  @ApiOkResponse({ 
    description: 'Quote updated successfully',
    type: Quote
  })
  @ApiNotFoundResponse({ 
    description: 'Quote not found - The specified quote ID does not exist',
    schema: { example: getErrorResponseShape(404) }
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request - Invalid input data. Possible reasons: empty text, text too long (>3000 chars), invalid book reference',
    schema: { example: getErrorResponseShape(400) }
  })
  async update(@Param('id') id: string, @Body(ValidationPipe) updateQuoteDto: UpdateQuoteDto) {
    const updatedQuote = await this.quoteService.update(id, updateQuoteDto);
    return formatResponseData(updatedQuote)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ 
    summary: 'Delete a quote',
    description: 'Permanently deletes a quote from the system. This action cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Unique identifier of the quote to delete (UUID format)',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiNoContentResponse({ 
    description: 'Quote was successfully deleted'
  })
  @ApiNotFoundResponse({ 
    description: 'Quote not found - The specified quote ID does not exist',
    schema: { example: getErrorResponseShape(404) }
  })
  async remove(@Param('id') id: string) {
    await this.quoteService.remove(id);
  }
}
