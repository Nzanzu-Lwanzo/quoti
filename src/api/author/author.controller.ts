import { Controller, Get, Post, Body, Query, ParseEnumPipe, InternalServerErrorException, ParseIntPipe, Patch, ValidationPipe, Param, NotFoundException, Delete, HttpCode, BadRequestException } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from "./author.dto";
import { formatResponseData } from 'src/lib/formatters';
import { PrismaClientKnownRequestError } from 'prisma/dist/runtime/library';

@Controller('api/author')
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService
  ) { }

  // CREATE
  @Post()
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
  async findAll(
    @Query('name') name?: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
  ) {
    const authors = await this.authorService.getManyAuthors(name, limit)
    return formatResponseData(authors)
  }

  // GET ONE
  @Get(":id")
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
  async deleteAll() {
    await this.authorService.deleteAllAuthors()
  }

  // DELETE ONE
  @Delete(':id')
  @HttpCode(204)
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
