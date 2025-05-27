import { Request, Response } from 'express';
import { PrismaClient, EducationLevel } from '@prisma/client';
import { validateCandidate } from '../validators/candidate.validator';
import { z } from 'zod';

const defaultPrisma = new PrismaClient();

// Validation schemas
const candidateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Email inválido. Debe tener el formato nombre@dominio.tld',
    }),
  phone: z.string().min(1),
  educationLevel: z.enum([
    'Primaria',
    'Secundaria',
    'Terciaria',
    'Universitaria',
    'Posgrado',
    'Doctorado',
  ]),
  institution: z.string().min(1),
  degree: z.string().min(1),
  graduationYear: z.number().min(1950),
  currentPosition: z.string().min(1),
  currentCompany: z.string().min(1),
  totalExperience: z.number().min(0),
  startDate: z.string().min(1),
  isCurrentlyWorking: z.boolean(),
  endDate: z.string().optional().nullable(),
  experienceDescription: z.string().min(1),
});

const updateCandidateSchema = candidateSchema.partial();

export const getCandidateById = async (
  req: Request,
  res: Response,
  prismaInstance?: PrismaClient,
) => {
  const prisma = prismaInstance || defaultPrisma;
  const { id } = req.params;
  const candidateId = Number(id);

  if (isNaN(candidateId) || candidateId <= 0) {
    return res.status(404).json({
      success: false,
      message: 'ID de candidato inválido',
      errors: ['id'],
    });
  }

  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidato no encontrado',
        errors: ['not_found'],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Candidato encontrado',
      data: candidate,
    });
  } catch (error: any) {
    console.error('Error al obtener candidato:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const candidateController = {
  // Get all candidates with pagination
  async getAllCandidates(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [candidates, total] = await Promise.all([
        defaultPrisma.candidate.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        defaultPrisma.candidate.count(),
      ]);

      res.json({
        data: candidates,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch {
      res.status(500).json({ error: 'Error fetching candidates' });
    }
  },

  // Get a single candidate by ID
  async getCandidateById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(404).json({ error: 'Candidate not found' });
        return;
      }
      const candidate = await defaultPrisma.candidate.findUnique({
        where: { id },
      });
      if (!candidate) {
        res.status(404).json({ error: 'Candidate not found' });
        return;
      }
      res.json(candidate);
      return;
    } catch {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  },

  // Create a new candidate
  async createCandidate(req: Request, res: Response) {
    try {
      const validatedData = candidateSchema.parse(req.body);
      const candidate = await defaultPrisma.candidate.create({
        data: {
          ...validatedData,
          educationLevel: validatedData.educationLevel as EducationLevel,
          graduationYear: Number(validatedData.graduationYear),
          totalExperience: Number(validatedData.totalExperience),
          startDate: new Date(validatedData.startDate),
          endDate: validatedData.endDate
            ? new Date(validatedData.endDate)
            : null,
        },
      });
      return res.status(201).json(candidate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Error creating candidate' });
    }
  },

  // Update a candidate
  async updateCandidate(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(404).json({ error: 'Candidate not found' });
        return;
      }
      const candidate = await defaultPrisma.candidate.findUnique({
        where: { id },
      });
      if (!candidate) {
        res.status(404).json({ error: 'Candidate not found' });
        return;
      }
      const result = updateCandidateSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ error: result.error.errors });
        return;
      }
      const updatedCandidate = await defaultPrisma.candidate.update({
        where: { id },
        data: result.data,
      });
      res.json(updatedCandidate);
      return;
    } catch {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  },

  // Delete a candidate
  async deleteCandidate(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(404).json({ error: 'Candidate not found' });
        return;
      }
      const candidate = await defaultPrisma.candidate.findUnique({
        where: { id },
      });
      if (!candidate) {
        res.status(404).json({ error: 'Candidate not found' });
        return;
      }
      await defaultPrisma.candidate.delete({
        where: { id },
      });
      res.status(204).send();
      return;
    } catch {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  },
};
