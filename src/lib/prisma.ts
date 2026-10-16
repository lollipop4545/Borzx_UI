import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// In production, log errors and warnings only to avoid spamming the console
// Connection pooling is typically handled in the DATABASE_URL (e.g. pgBouncer or Neon pooling)
// For Neon serverless, append ?pgbouncer=true&connection_limit=10 to the URL

let databaseUrl = process.env.DATABASE_URL || '';
if (databaseUrl && databaseUrl.includes('neon.tech') && !databaseUrl.includes('pgbouncer=true')) {
  databaseUrl += (databaseUrl.includes('?') ? '&' : '?') + 'pgbouncer=true';
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: databaseUrl,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
