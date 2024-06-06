import { PrismaClient } from "@prisma/client"

declare global {
   var prisma: PrismaClient | undefined
}

export const prismaDB = globalThis.prisma || new PrismaClient()

// Avoid multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaDB
