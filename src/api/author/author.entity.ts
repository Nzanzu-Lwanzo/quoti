import { Book } from "../book/lib/book.entity"
import { ApiProperty } from "@nestjs/swagger"

export class Author {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
    @ApiProperty()
    image?: string
    @ApiProperty()
    bio?: string
    @ApiProperty({
        example: {
            books: 0
        }
    })
    _count: {
        books: number
    }
}