import { PrismaClient } from "@prisma/client"

declare global {
   var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

// This is a workaround to prevent Prisma from being initialized multiple times in development
if (process.env.NODE_ENV !== "production") globalThis.prisma
