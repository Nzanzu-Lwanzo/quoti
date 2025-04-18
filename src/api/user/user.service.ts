import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "./user.dto";
import { UpdateUserDto } from './user.dto';
import { DatabaseService } from 'src/database/database.service';
import { generateSecurePassword } from 'src/lib/passwordHandlers';

@Injectable()
export class UserService {

  constructor(
    private db: DatabaseService
  ) { }

  // GLOBAL VARS
  joinSchema = {
    _count: {
      select: {
        quotes: true,
        upvotedQuotes: true
      }
    }
  }

  async create(createUserDto: CreateUserDto) {

    const securePassword = await generateSecurePassword(createUserDto.password)
    const createdUser = await this.db.user.create({
      data: {
        ...createUserDto,
        password: securePassword
      }
    })

    return createdUser

  }

  async findAll() {
    const users = await this.db.user.findMany({
      orderBy: {
        name: 'asc'
      },
      include: this.joinSchema,
      omit: {
        password: true
      }
    })
    return users
  }

  async findAllUsersQuotes(id: string, limit?: number) {
    const quotes = await this.db.quote.findMany({
      where: {
        uploaderId: id
      },
      take: limit
    })
    return quotes
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id
      },
      omit: {
        password: true
      },
      include: this.joinSchema
    })
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let securePassword: undefined | string = undefined

    if (updateUserDto.password) {
      securePassword = await generateSecurePassword(updateUserDto.password)
    }

    const updatedUser = await this.db.user.update({
      where: {
        id
      },
      data: { ...updateUserDto, password: securePassword },
      include: this.joinSchema,
      omit: {
        password: true
      }
    })

    return updatedUser
  }

  async remove(id: string) {
    await this.db.user.delete({
      where: {
        id
      }
    })
  }
}
