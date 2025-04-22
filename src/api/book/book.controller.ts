import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe, ParseBoolPipe, ParseEnumPipe, NotFoundException, HttpCode } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from "./lib/book.dto";
import { UpdateBookDto } from './lib/book.dto';
import { formatResponseData } from 'src/lib/formatters';
import { FilterComparisonOptions } from './lib/@types';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  // CREATE
  @Post()
  async create(
    @Body(new ValidationPipe({ whitelist: true })) createBookDto: CreateBookDto
  ) {
    const createdBook = await this.bookService.create(createBookDto);
    return formatResponseData(createdBook)
  }

  // GET ALL
  @Get()
  async findAll(
    @Query('pyc', new ParseEnumPipe(["gt", "lt", "eq"], { optional: true })) pyc?: FilterComparisonOptions,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('py', new ParseIntPipe({ optional: true })) publishYear?: number,
    @Query('ph') publishingHouse?: string,
    @Query('pt') publishingTown?: string,
    @Query('ed') edition?: string,
  ) {
    const books = await this.bookService.findAll({
      limit,
      publishYear,
      publishingHouse,
      publishingTown,
      edition,
      pyc
    });
    return formatResponseData(books)
  }

  // GET QUOTES ASSOCIATED TO BOOK
  @Get('/quotes/:id')
  async getAllQuotes(
    @Param('id') id: string
  ) {
    const quotes = await this.bookService.getAllQuotes(id)
    return formatResponseData(quotes)
  }

  // GET BOOK
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.bookService.findOne(id);

    if (!book) {
      throw new NotFoundException(`Book with <id : ${id}> not found`)
    }

    return formatResponseData(book)
  }

  // ADD AUTHOR TO BOOK'S AUTHORS ARRAY
  @Patch('/add')
  async addAuthorToBook(
    @Query('book') bookId: string,
    @Query('author') authorId: string,
  ) {
    const updatedBook = await this.bookService.addAuthorToBook(bookId, authorId)
    return formatResponseData(updatedBook)
  }

  // REMOVE AUTHOR FROM BOOK'S AUTHORS ARRAY
  @Patch('/remove')
  async removeAuthorFromBook(
    @Query('book') bookId: string,
    @Query('author') authorId: string,
  ) {
    const updatedBook = await this.bookService.removeAuthorFromBook(bookId, authorId)
    return formatResponseData(updatedBook)
  }

  // UPDATE ONE BOOK
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateBookDto: Omit<UpdateBookDto, "authors">) {
    const updatedBook = await this.bookService.update(id, updateBookDto);
    return formatResponseData(updatedBook)
  }

  // DELETE ONE BOOK
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.bookService.remove(id);
  }
}
