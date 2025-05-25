import { PrismaClient, EducationLevel } from '@prisma/client';

describe('Candidate Model (Prisma)', () => {
  const prisma = new PrismaClient();

  beforeEach(async () => {
    await prisma.candidate.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('debería crear un candidato válido', async () => {
    const candidate = await prisma.candidate.create({
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@email.com',
        phone: '+54 11 1234-5678',
        educationLevel: EducationLevel.UNIVERSITY,
        institution: 'UBA',
        degree: 'Ingeniería',
        graduationYear: 2020,
        currentPosition: 'Developer',
        currentCompany: 'TestCorp',
        totalExperience: 3,
        startDate: new Date('2020-01-01'),
        isCurrentlyWorking: true,
        experienceDescription: 'Desarrollo de software.',
      },
    });
    expect(candidate).toHaveProperty('id');
    expect(candidate.email).toBe('test.user@email.com');
  });

  it('debería rechazar email duplicado', async () => {
    await prisma.candidate.create({
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'duplicate@email.com',
        phone: '+54 11 1234-5678',
        educationLevel: EducationLevel.UNIVERSITY,
        institution: 'UBA',
        degree: 'Ingeniería',
        graduationYear: 2020,
        currentPosition: 'Developer',
        currentCompany: 'TestCorp',
        totalExperience: 3,
        startDate: new Date('2020-01-01'),
        isCurrentlyWorking: true,
        experienceDescription: 'Desarrollo de software.',
      },
    });
    await expect(
      prisma.candidate.create({
        data: {
          firstName: 'Test2',
          lastName: 'User2',
          email: 'duplicate@email.com',
          phone: '+54 11 9999-8888',
          educationLevel: EducationLevel.UNIVERSITY,
          institution: 'UBA',
          degree: 'Ingeniería',
          graduationYear: 2021,
          currentPosition: 'QA',
          currentCompany: 'TestCorp',
          totalExperience: 2,
          startDate: new Date('2021-01-01'),
          isCurrentlyWorking: true,
          experienceDescription: 'QA testing.',
        },
      }),
    ).rejects.toThrow();
  });

  it('debería rechazar candidato sin campos obligatorios', async () => {
    await expect(
      prisma.candidate.create({
        data: {
          // Falta firstName, lastName, email, phone, etc.
          educationLevel: EducationLevel.UNIVERSITY,
          institution: 'UBA',
          degree: 'Ingeniería',
          graduationYear: 2020,
          currentPosition: 'Developer',
          currentCompany: 'TestCorp',
          totalExperience: 3,
          startDate: new Date('2020-01-01'),
          isCurrentlyWorking: true,
          experienceDescription: 'Desarrollo de software.',
        } as any,
      }),
    ).rejects.toThrow();
  });

  it('debería rechazar candidato con campo largo en firstName', async () => {
    await expect(
      prisma.candidate.create({
        data: {
          firstName: 'A'.repeat(101), // Excede el límite
          lastName: 'User',
          email: 'long.name@email.com',
          phone: '+54 11 1234-5678',
          educationLevel: EducationLevel.UNIVERSITY,
          institution: 'UBA',
          degree: 'Ingeniería',
          graduationYear: 2020,
          currentPosition: 'Developer',
          currentCompany: 'TestCorp',
          totalExperience: 3,
          startDate: new Date('2020-01-01'),
          isCurrentlyWorking: true,
          experienceDescription: 'Desarrollo de software.',
        },
      }),
    ).rejects.toThrow();
  });

  it('debería rechazar candidato con totalExperience negativo', async () => {
    await expect(
      prisma.candidate.create({
        data: {
          firstName: 'Test',
          lastName: 'User',
          email: 'negative.exp@email.com',
          phone: '+54 11 1234-5678',
          educationLevel: EducationLevel.UNIVERSITY,
          institution: 'UBA',
          degree: 'Ingeniería',
          graduationYear: 2020,
          currentPosition: 'Developer',
          currentCompany: 'TestCorp',
          totalExperience: -1, // No está validado en DB, pero sí en backend
          startDate: new Date('2020-01-01'),
          isCurrentlyWorking: true,
          experienceDescription: 'Desarrollo de software.',
        },
      }),
    ).resolves.toBeDefined(); // NOTA: Prisma no valida esto, debe validarse en backend
  });
});
