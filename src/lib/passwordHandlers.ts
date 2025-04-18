import { hash, compare } from 'bcryptjs'

export const generateSecurePassword = async (raw: string) => {
    const hashedPassword = await hash(raw, 10)
    return hashedPassword
}

export const doesPasswordsMatch = async (raw: string, hashed: string) => {
    const match = await compare(raw, hashed)
    return match
}