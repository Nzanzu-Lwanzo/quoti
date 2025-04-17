import { Injectable } from '@nestjs/common';
import { CreateBookDto } from "./lib/book.dto";
import { UpdateBookDto } from './lib/book.dto';
import { DatabaseService } from '../../database/database.service';
import { FilterBooksOptionsType } from './lib/@types';
import { getFilterOptionsByPublishYear } from './lib/helpers';

@Injectable()
export class BookService {

  constructor(
    private db: DatabaseService
  ) { }

  // GLOBAL VARS
  defaultTakeBooks: number = 50;
  joinSchema = {
    authors: true,
    _count: {
      select: {
        quotes: true
      }
    }
  }


  async create(createBookDto: CreateBookDto) {
    const createdBook = await this.db.book.create({
      data: {
        ...createBookDto,
        authors: {
          connect: createBookDto.authors.map((id) => ({ id }))
        }
      }
    })
    return createdBook
  }

  async findAll(filterOptions?: Partial<FilterBooksOptionsType>) {

    const books = await this.db.book.findMany({
      take: filterOptions?.limit || this.defaultTakeBooks,
      where: {
        publishYear: getFilterOptionsByPublishYear(filterOptions?.publishYear, filterOptions?.pyc),
        publishingHouse: filterOptions?.publishingHouse ? { contains: filterOptions?.publishingHouse } : undefined,
        publishingTown: filterOptions?.publishingTown ? { contains: filterOptions?.publishingTown } : undefined,
        edition: filterOptions?.edition ? { contains: filterOptions?.edition } : undefined,
      },
      include: this.joinSchema
    })

    return books
  }

  async getAllQuotes(id: string) {
    const bookQuotes = await this.db.book.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        title: true,
        quotes: {
          omit: {
            bookId: true
          }
        }
      }
    })
    return bookQuotes;
  }

  async findOne(id: string) {
    const book = await this.db.book.findUnique({
      where: {
        id
      },
      include: this.joinSchema
    })
    return book
  }

  async update(id: string, updateBookDto: Omit<UpdateBookDto, "authors">) {
    const updatedBook = await this.db.book.update({
      where: {
        id
      },
      data: updateBookDto,
      include: this.joinSchema
    })

    return updatedBook
  }

  async remove(id: string) {
    await this.db.book.delete({
      where: {
        id
      },
      include: this.joinSchema
    })
  }

  async addAuthorToBook(bookId: string, authorId: string) {

    const updatedBook = await this.db.book.update({
      where: {
        id: bookId
      },
      data: {
        authors: {
          connect: [{ id: authorId }]
        }
      },
      include: this.joinSchema
    })

    return updatedBook

  }

  async removeAuthorFromBook(bookId: string, authorId: string) {

    const updatedBook = await this.db.book.update({
      where: {
        id: bookId
      },
      data: {
        authors: {
          disconnect: [{ id: authorId }]
        }
      },
      include: this.joinSchema
    })

    return updatedBook
  }
}
