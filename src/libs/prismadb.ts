import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined //global declaration of prisma to use across the application
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV != 'production' ) globalThis.prisma = client
//if we are in development by chcking if we are not in production, we set this global prisma client to the newly created client

//we write this code line because, next js hot reload give bunch of prisma client instances that give warnings in the terminal
//Through this method it is not affected by hot reload, and no need import prisma client in every file (BEST PRACTISE)

export default client;