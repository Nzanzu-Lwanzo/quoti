import { hash, compare } from 'bcryptjs'
import { generatePassword } from 'm-secure-password-generator'

export const generateSecurePassword = async (raw: string) => {
    const hashedPassword = await hash(raw, 10)
    return hashedPassword
}

export const doesPasswordsMatch = async (raw: string, hashed: string) => {
    const match = await compare(raw, hashed)
    return match
}

export const generateDefaultPasswordForOAuth = async () => {
    return generatePassword({
        avoid: "` { } [ ] ( ) ~",
        chars: true,
        length: 8,
        lower: true,
        numbr: true,
        upper: true,
        strct: true
    })
}