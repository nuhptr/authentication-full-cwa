import { PrismaClient } from "@prisma/client"

//* Extend the global object to include `prisma`
declare global {
    var prisma: PrismaClient | undefined
}

//* Create a new Prisma Client instance if in the first run
export const db = globalThis.prisma || new PrismaClient()

//* This is a workaround to avoid multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== "production") globalThis.prisma = db
