import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException, HttpCode, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from "./user.dto";
import { UpdateUserDto } from './user.dto';
import { formatResponseData } from 'src/lib/formatters';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // CREATE
  @Post()
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ) {
    const createdUser = await this.userService.create(createUserDto);
    return formatResponseData(createdUser)
  }

  // GET ALL
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return formatResponseData(users)
  }

  // GET ALL USER'S QUOTES
  @Get('/quotes')
  async findAllUsersQuotes(
    @Query('limit', ParseIntPipe) limit?: number
  ) {
    const quotes = await this.userService.findAllUsersQuotes('', limit)
    return formatResponseData(quotes)
  }

  // GET ONE
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with <id :${id}> not found`)
    }

    return formatResponseData(user)
  }

  // UPDATE ONE
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return formatResponseData(updatedUser)
  }
  // DELETE ONE
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
  }
}
