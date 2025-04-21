import { Quote } from "@prisma/client"

export class User {
    id: string
    name?: string
    email: string
    password: string
    newsletter: boolean
    newsletterFrequence: "ON_UPLOAD" | "EVERY_DAY" | "ONCE_A_WEEK"
    _count: {
        quotes: number
        upvotes: number
    }

}
