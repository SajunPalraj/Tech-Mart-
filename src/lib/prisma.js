import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// This ensures we reuse the database connection instead of opening a new one every time you save code
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
