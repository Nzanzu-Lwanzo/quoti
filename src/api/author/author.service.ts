import { Injectable, Options } from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from "./author.dto";
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthorService {

    constructor(
        private db: DatabaseService
    ) { }

    async createAuthor(createAuthorDto: CreateAuthorDto) {
        const createdAuthor = await this.db.author.create({
            data: createAuthorDto
        })

        return createdAuthor
    }

    async getManyAuthors(nameHint?: string, limit?: number) {

        const options = {}

        // Search author whose nameHint starts with the nameHint hint
        if (nameHint) {
            options['where'] = {
                name: {
                    contains: nameHint
                }
            }
        }

        // Limit the number of authors we want to fetch in a request
        if (limit) {
            options['take'] = limit
        }

        const authors = await this.db.author.findMany({
            ...options,
            include: {
                _count: {
                    select: {
                        books: true
                    }
                }
            }
        });
        return authors
    }


    async getAnAuthor(id: string) {
        const foundAuthor = await this.db.author.findUnique({
            where: {
                id
            }
        })

        return foundAuthor
    }

    async updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto) {

        const updatedAuthor = await this.db.author.update({
            where: {
                id
            },
            data: updateAuthorDto
        })

        return updatedAuthor
    }

    async deleteAllAuthors() {
        await this.db.author.deleteMany()
    }

    async deleteAnAuthor(id: string) {
        await this.db.author.delete({
            where: {
                id
            }
        })
    }
}
