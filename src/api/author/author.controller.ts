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
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from "./author.dto";
import { formatResponseData } from 'src/lib/formatters';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { Author } from './author.entity';
import { getErrorResponseShape } from 'src/lib/helpers';

@ApiTags('Authors')
@Controller('api/author')
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService
  ) { }

  // CREATE
  @Post()
  @ApiOperation({ 
    summary: "Create an author",
    description: "Creates a new author in the system. The name field is required and must be unique, while bio and image are optional. The bio must be between 32 and 1024 characters if provided, and the image must be a valid URL."
  })
  @ApiBody({ 
    type: CreateAuthorDto,
    description: "Author creation data. The name is required and must be unique. Bio is optional but must be between 32-1024 characters if provided. Image is optional and must be a valid URL if provided."
  })
  @ApiCreatedResponse({ 
    description: "Author was created successfully. Returns the created author with their ID and book count.",
    type: Author
  })
  @ApiBadRequestResponse({ 
    description: "Invalid input data. Possible reasons: missing name, name too long (>256 chars), bio too short (<32 chars), bio too long (>1024 chars), invalid image URL, or duplicate author name",
    schema: { example: getErrorResponseShape(400) }
  })
  @ApiInternalServerErrorResponse({ 
    description: "Server error occurred. Possible reasons: database constraint violation or unexpected error",
    schema: { example: getErrorResponseShape(500) }
  })
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
  @ApiOperation({ 
    summary: "Get a list of authors",
    description: "Retrieves a list of authors with optional filtering and pagination. Can search by name and limit the number of results. Each author in the response includes their ID, name, bio, image URL, and book count."
  })
  @ApiQuery({ 
    name: 'name', 
    description: 'Search term to filter authors by name. Performs partial matching.',
    type: 'string', 
    required: false,
    example: 'Fitzgerald'
  })
  @ApiQuery({ 
    name: 'limit', 
    description: 'Maximum number of authors to return. If not specified, returns all matching authors.',
    type: 'number', 
    required: false,
    example: 10
  })
  @ApiOkResponse({ 
    description: "Authors retrieved successfully. Returns an array of authors, each including their ID, name, bio, image URL, and book count.",
    type: [Author]
  })
  @ApiInternalServerErrorResponse({ 
    description: "Server error occurred while fetching authors",
    schema: { example: getErrorResponseShape(500) }
  })
  async findAll(
    @Query('name') name?: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
  ) {
    const authors = await this.authorService.getManyAuthors(name, limit)
    return formatResponseData(authors)
  }

  // GET ONE
  @Get(":id")
  @ApiOperation({ 
    summary: "Get an author by ID",
    description: "Retrieves detailed information about a specific author, including their ID, name, bio, image URL, and the count of books they have written."
  })
  @ApiParam({ 
    name: 'id', 
    description: "Unique identifier of the author (UUID format)",
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiOkResponse({ 
    description: "Author retrieved successfully. Returns the author's details including their ID, name, bio, image URL, and book count.",
    type: Author
  })
  @ApiNotFoundResponse({ 
    description: "Author not found - The specified author ID does not exist",
    schema: { example: getErrorResponseShape(404) }
  })
  @ApiInternalServerErrorResponse({ 
    description: "Server error occurred while fetching the author",
    schema: { example: getErrorResponseShape(500) }
  })
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
  @ApiOperation({ 
    summary: "Update an author's data",
    description: "Updates the information of an existing author. All fields are optional - only include the fields you want to update. The same validation rules as creation apply to each field."
  })
  @ApiParam({ 
    name: 'id', 
    description: "Unique identifier of the author to update (UUID format)",
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiBody({ 
    type: UpdateAuthorDto,
    description: "Updated author data. Only include the fields you want to update. Each field follows the same validation rules as creation: name must be unique and <=256 chars, bio must be 32-1024 chars if provided, image must be a valid URL if provided."
  })
  @ApiOkResponse({ 
    description: "Author updated successfully. Returns the updated author's details including their ID, name, bio, image URL, and book count.",
    type: Author
  })
  @ApiNotFoundResponse({ 
    description: "Author not found - The specified author ID does not exist",
    schema: { example: getErrorResponseShape(404) }
  })
  @ApiBadRequestResponse({ 
    description: "Invalid input data. Possible reasons: name too long (>256 chars), bio too short (<32 chars), bio too long (>1024 chars), invalid image URL, or duplicate author name",
    schema: { example: getErrorResponseShape(400) }
  })
  @ApiInternalServerErrorResponse({ 
    description: "Server error occurred while updating the author",
    schema: { example: getErrorResponseShape(500) }
  })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAuthorDto: UpdateAuthorDto
  ) {
    const updatedAuthor = await this.authorService.updateAuthor(id, updateAuthorDto)
    return formatResponseData(updatedAuthor)
  }

  // DELETE ALL
  @Delete()
  @HttpCode(204)
  @ApiOperation({ 
    summary: "Delete all authors",
    description: "Permanently deletes all authors from the system. This action cannot be undone. Use with extreme caution."
  })
  @ApiNoContentResponse({ 
    description: "All authors were successfully deleted"
  })
  @ApiInternalServerErrorResponse({ 
    description: "Server error occurred while deleting authors",
    schema: { example: getErrorResponseShape(500) }
  })
  async deleteAll() {
    await this.authorService.deleteAllAuthors()
  }

  // DELETE ONE
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ 
    summary: "Delete an author",
    description: "Permanently deletes a specific author from the system. This action cannot be undone."
  })
  @ApiParam({ 
    name: 'id', 
    description: "Unique identifier of the author to delete (UUID format)",
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiNoContentResponse({ 
    description: "Author was successfully deleted"
  })
  @ApiNotFoundResponse({ 
    description: "Author not found - The specified author ID does not exist",
    schema: { example: getErrorResponseShape(404) }
  })
  @ApiInternalServerErrorResponse({ 
    description: "Server error occurred while deleting the author",
    schema: { example: getErrorResponseShape(500) }
  })
  async deleteOne(
    @Param('id') id: string
  ) {
    await this.authorService.deleteAnAuthor(id)
  }
}
