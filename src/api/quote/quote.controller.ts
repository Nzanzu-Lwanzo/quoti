import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException, HttpCode, UseGuards } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from "./quote.dto";
import { UpdateQuoteDto } from './quote.dto';
import { formatResponseData } from 'src/lib/formatters';
import { Public } from '../auth/auth.decorator';

@Controller('api/quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) { }

  // CREATE
  @Post()
  async create(@Body(ValidationPipe) createQuoteDto: CreateQuoteDto) {
    const createdQuote = await this.quoteService.create(createQuoteDto);
    return formatResponseData(createdQuote)
  }

  // GET ALL
  @Public()
  @Get()
  async findAll() {
    const quotes = await this.quoteService.findAll();
    return formatResponseData(quotes)
  }

  // GET ONE
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quote = await this.quoteService.findOne(id);

    if (!quote) {
      throw new NotFoundException(`Quote with <id : ${id}> not found`)
    }

    return formatResponseData(quote)
  }

  // UPDATE ONE (UPDATE THE REFERENCE, NOT THE CATEGORIES. FOR CATEGORIES, SEE CATEGORY ENDPOINTS)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateQuoteDto: UpdateQuoteDto) {
    const updatedQuote = await this.quoteService.update(id, updateQuoteDto);
    return formatResponseData(updatedQuote)
  }

  // DELETE ONE
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.quoteService.remove(id);
  }
}
