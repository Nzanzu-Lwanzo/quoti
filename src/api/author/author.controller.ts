import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  InternalServerErrorException,
  ParseIntPipe,
  Patch,
  ValidationPipe,
  Param,
  NotFoundException,
  Delete,
  HttpCode,
  BadRequestException
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from "./author.dto";
import { formatResponseData } from 'src/lib/formatters';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, OmitType, PartialType } from '@nestjs/swagger';
import { Author } from './author.entity';
import { getErrorResponseShape } from 'src/lib/helpers';

@Controller('api/author')
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService
  ) { }

  // CREATE
  @Post()
  @ApiOperation({ summary: "Create an author" })
  @ApiBody({ type: CreateAuthorDto })
  @ApiCreatedResponse({ description: "In case author was created successfully", type: OmitType(Author, ['_count']) })
  @ApiInternalServerErrorResponse({ description: "In case there's an uncaught server exception", schema: { example: getErrorResponseShape(500) } })
  async create(@Body(ValidationPipe) createAuthorDto: CreateAuthorDto) {
    try {

      const createdAuthor = await this.authorService.createAuthor(createAuthorDto)
      return formatResponseData(createdAuthor)

    } catch (err) {

      const error = err as Error;
      let message: string | undefined = undefined

      if (error instanceof PrismaClientKnownRequestError) {
        message = "A <unique> constraint might have been violated"
      }

      throw new InternalServerErrorException(message)
    }
  }

  // GET MANY
  @Get()
  @ApiOperation({ summary: "Get a list of authors" })
  @ApiQuery({ name: 'name', description: 'Search hint to confront against the names of the authors, when looking up for some.', type: 'string', required: false })
  @ApiQuery({ name: 'limit', description: 'Limit the number of authors to fetch in one request', type: 'number', required: false })
  @ApiOkResponse({ description: "In case authors where found successfully", type: Author })
  @ApiInternalServerErrorResponse({ description: "In case there's an uncaught server exception", schema: { example: getErrorResponseShape(500) } })
  async findAll(
    @Query('name') name?: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
  ) {
    const authors = await this.authorService.getManyAuthors(name, limit)
    return formatResponseData(authors)
  }

  // GET ONE
  @Get(":id")
  @ApiOperation({ summary: "Get one author by their id" })
  @ApiParam({ name: 'id', description: "id of the author to get" })
  @ApiOkResponse({ type: Author })
  @ApiNotFoundResponse({ description: "In case the author is not found, a 404 error will be thown", schema: { example: getErrorResponseShape(404) } })
  @ApiInternalServerErrorResponse({ description: "In case there's an uncaught server exception", schema: { example: getErrorResponseShape(500) } })
  async findOne(
    @Param('id') id: string
  ) {
    const author = await this.authorService.getAnAuthor(id);

    if (!author) {
      throw new NotFoundException(`Author with <id : ${id}> not found`)
    }

    return formatResponseData(author)
  }

  // UPDATE
  @Patch(':id')
  @ApiOperation({ summary: "Update an author's data" })
  @ApiBody({ type: PartialType(CreateAuthorDto) })
  @ApiOkResponse({ type: Author })
  @ApiInternalServerErrorResponse({ description: "In case there's an uncaught server exception", schema: { example: getErrorResponseShape(500) } })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAuthorDto: UpdateAuthorDto
  ) {
    const updatedAuthor = await this.authorService.updateAuthor(id, updateAuthorDto)
    return updatedAuthor
  }

  // DELETE ALL
  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete all the authors' })
  @ApiNoContentResponse({ description: "After deletion nothing will be returned" })
  @ApiInternalServerErrorResponse({ description: "In case there's an uncaught server exception", schema: { example: getErrorResponseShape(500) } })
  async deleteAll() {
    await this.authorService.deleteAllAuthors()
  }

  // DELETE ONE
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete one author based on their id' })
  @ApiParam({ name: 'id', description: "id of the author to delete" })
  @ApiNoContentResponse({ description: "After deletion nothing will be returned" })
  @ApiInternalServerErrorResponse({ description: "In case there's an uncaught server exception", schema: { example: getErrorResponseShape(500) } })
  async deleteOne(
    @Param('id') id: string
  ) {
    try {
      await this.authorService.deleteAnAuthor(id)
    } catch {
      throw new BadRequestException(`Author with <id : ${id}> does probably not exist`)
    }
  }

}
