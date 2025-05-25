import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { beforeAll, afterAll } from '@jest/globals';

// Load environment variables
dotenv.config();

// Set test environment
process.env.NODE_ENV = 'test';

// Create a new Prisma client for testing
const prisma = new PrismaClient();

// Clean up database before tests
beforeAll(async () => {
  await prisma.candidate.deleteMany();
});

// Disconnect Prisma after tests
afterAll(async () => {
  await prisma.$disconnect();
});
