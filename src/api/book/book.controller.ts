import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe, ParseBoolPipe, ParseEnumPipe, NotFoundException, HttpCode } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from "./lib/book.dto";
import { UpdateBookDto } from './lib/book.dto';
import { formatResponseData } from 'src/lib/formatters';
import { FilterComparisonOptions } from './lib/@types';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Book } from './lib/book.entity';

@ApiTags('Books')
@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  // CREATE
  @Post()
  @ApiOperation({ 
    summary: 'Create a new book',
    description: 'Creates a new book with the provided details. The book must have a title and at least one author. All other fields are optional.'
  })
  @ApiBody({ 
    type: CreateBookDto,
    description: 'Book creation data including title, summary, publishing details, and author IDs'
  })
  @ApiCreatedResponse({ 
    description: 'The book has been successfully created',
    type: Book
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request - Invalid input data. Possible reasons: missing required fields, invalid author IDs, invalid data types'
  })
  async create(
    @Body(new ValidationPipe({ whitelist: true })) createBookDto: CreateBookDto
  ) {
    const createdBook = await this.bookService.create(createBookDto);
    return formatResponseData(createdBook)
  }

  // GET ALL
  @Get()
  @ApiOperation({ 
    summary: 'Get all books',
    description: 'Retrieves a list of books with optional filtering parameters. Supports pagination and various filter criteria.'
  })
  @ApiQuery({ 
    name: 'pyc', 
    required: false,
    enum: ['gt', 'lt', 'eq'],
    description: 'Comparison operator for publish year filtering. Use "gt" for greater than, "lt" for less than, "eq" for equal to'
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false,
    type: Number,
    description: 'Maximum number of books to return. Defaults to all books if not specified',
    example: 10
  })
  @ApiQuery({ 
    name: 'py', 
    required: false,
    type: Number,
    description: 'Publish year to filter by. Must be used with pyc parameter',
    example: 1925
  })
  @ApiQuery({ 
    name: 'ph', 
    required: false,
    type: String,
    description: 'Publishing house to filter by',
    example: 'Charles Scribner\'s Sons'
  })
  @ApiQuery({ 
    name: 'pt', 
    required: false,
    type: String,
    description: 'Publishing town to filter by',
    example: 'New York'
  })
  @ApiQuery({ 
    name: 'ed', 
    required: false,
    type: String,
    description: 'Edition to filter by',
    example: '1'
  })
  @ApiOkResponse({ 
    description: 'List of books retrieved successfully',
    type: [Book]
  })
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
  @ApiOperation({ 
    summary: 'Get all quotes from a book',
    description: 'Retrieves all quotes associated with a specific book. Returns an array of quotes with their content and metadata.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'The ID of the book to get quotes from',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiOkResponse({ 
    description: 'List of quotes retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440002' },
          content: { type: 'string', example: 'So we beat on, boats against the current, borne back ceaselessly into the past.' },
          page: { type: 'number', example: 180 }
        }
      }
    }
  })
  @ApiNotFoundResponse({ 
    description: 'Book not found - The specified book ID does not exist'
  })
  async getAllQuotes(
    @Param('id') id: string
  ) {
    const quotes = await this.bookService.getAllQuotes(id)
    return formatResponseData(quotes)
  }

  // GET BOOK
  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a book by ID',
    description: 'Retrieves detailed information about a specific book, including its authors and metadata.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'The ID of the book to retrieve',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiOkResponse({ 
    description: 'Book retrieved successfully',
    type: Book
  })
  @ApiNotFoundResponse({ 
    description: 'Book not found - The specified book ID does not exist'
  })
  async findOne(@Param('id') id: string) {
    const book = await this.bookService.findOne(id);

    if (!book) {
      throw new NotFoundException(`Book with <id : ${id}> not found`)
    }

    return formatResponseData(book)
  }

  // ADD AUTHOR TO BOOK'S AUTHORS ARRAY
  @Patch('/add')
  @ApiOperation({ 
    summary: 'Add an author to a book',
    description: 'Adds an author to the list of authors for a specific book. The author must exist in the system.'
  })
  @ApiQuery({ 
    name: 'book', 
    required: true,
    description: 'The ID of the book to update',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiQuery({ 
    name: 'author', 
    required: true,
    description: 'The ID of the author to add',
    example: '550e8400-e29b-41d4-a716-446655440001'
  })
  @ApiOkResponse({ 
    description: 'Author added successfully',
    type: Book
  })
  @ApiNotFoundResponse({ 
    description: 'Book or author not found - Either the specified book ID or author ID does not exist'
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request - Author is already associated with the book'
  })
  async addAuthorToBook(
    @Query('book') bookId: string,
    @Query('author') authorId: string,
  ) {
    const updatedBook = await this.bookService.addAuthorToBook(bookId, authorId)
    return formatResponseData(updatedBook)
  }

  // REMOVE AUTHOR FROM BOOK'S AUTHORS ARRAY
  @Patch('/remove')
  @ApiOperation({ 
    summary: 'Remove an author from a book',
    description: 'Removes an author from the list of authors for a specific book. The book must have at least one author remaining.'
  })
  @ApiQuery({ 
    name: 'book', 
    required: true,
    description: 'The ID of the book to update',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiQuery({ 
    name: 'author', 
    required: true,
    description: 'The ID of the author to remove',
    example: '550e8400-e29b-41d4-a716-446655440001'
  })
  @ApiOkResponse({ 
    description: 'Author removed successfully',
    type: Book
  })
  @ApiNotFoundResponse({ 
    description: 'Book or author not found - Either the specified book ID or author ID does not exist'
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request - Author is not associated with the book or book would have no authors left'
  })
  async removeAuthorFromBook(
    @Query('book') bookId: string,
    @Query('author') authorId: string,
  ) {
    const updatedBook = await this.bookService.removeAuthorFromBook(bookId, authorId)
    return formatResponseData(updatedBook)
  }

  // UPDATE ONE BOOK
  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a book',
    description: 'Updates the details of a specific book. All fields are optional except for the book ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'The ID of the book to update',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiBody({ 
    type: UpdateBookDto,
    description: 'Updated book data. Only include the fields you want to update.'
  })
  @ApiOkResponse({ 
    description: 'Book updated successfully',
    type: Book
  })
  @ApiNotFoundResponse({ 
    description: 'Book not found - The specified book ID does not exist'
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request - Invalid input data or validation error'
  })
  async update(@Param('id') id: string, @Body(ValidationPipe) updateBookDto: Omit<UpdateBookDto, "authors">) {
    const updatedBook = await this.bookService.update(id, updateBookDto);
    return formatResponseData(updatedBook)
  }

  // DELETE ONE BOOK
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ 
    summary: 'Delete a book',
    description: 'Permanently deletes a specific book from the system. This action cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'The ID of the book to delete',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Book deleted successfully'
  })
  @ApiNotFoundResponse({ 
    description: 'Book not found - The specified book ID does not exist'
  })
  async remove(@Param('id') id: string) {
    await this.bookService.remove(id);
  }
}
