import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from "./quote.dto";
import { UpdateQuoteDto } from './quote.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class QuoteService {

  constructor(
    private db: DatabaseService
  ) { }

  // GLOBAL VARS
  joinSchema = {
    categories: {
      select: {
        id: true, // Get the ids of the categories associated
        tag: true // Get the tags of the categories associated
      }
    },
    reference: {
      select: {
        id: true, // Get the id of the book associated,
        title: true, // Get the title of the book associated
        authors: {
          select: {
            id: true, // Get the ids of the authors of the categories associated
            name: true // Get the names of the authors of the categories associated
          }
        }
      }
    },
  }

  async create(createQuoteDto: CreateQuoteDto) {
    const createdQuote = await this.db.quote.create({
      data: {
        ...createQuoteDto,
        reference: {
          connect: { id: createQuoteDto.reference }
        },
        categories: {
          connect: createQuoteDto.categories.map((id) => ({ id }))
        },
      },
      include: this.joinSchema
    })
    return createdQuote
  }

  async findAll() {
    const quotes = await this.db.quote.findMany({
      include: this.joinSchema
    })
    return quotes
  }

  async findOne(id: string) {
    const quote = await this.db.quote.findUnique({
      where: {
        id
      },
      include: this.joinSchema
    })

    return quote
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    const updatedQuote = await this.db.quote.update({
      where: {
        id
      },
      data: {
        ...updateQuoteDto,
        reference: {
          connect: updateQuoteDto.reference ? { id: updateQuoteDto.reference } : undefined
        }
      },
      include: this.joinSchema
    })

    return updatedQuote
  }

  async remove(id: string) {
    await this.db.quote.delete({
      where: {
        id
      }
    })
  }
}
