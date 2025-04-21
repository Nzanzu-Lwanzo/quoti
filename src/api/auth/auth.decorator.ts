import { SetMetadata } from "@nestjs/common";

export const PUBLIC_API_KEY = 'isPublic'
export const Public = () => SetMetadata(PUBLIC_API_KEY, true)