import { Request, Response } from 'express';
import { createCandidate } from '../controllers/candidate.controller';

// Mock de PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    candidate: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn()
    }
  })),
  EducationLevel: {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY',
    TERTIARY: 'TERTIARY',
    UNIVERSITY: 'UNIVERSITY',
    POSTGRADUATE: 'POSTGRADUATE',
    DOCTORATE: 'DOCTORATE'
  }
}));

describe('Candidate Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    responseObject = {};
    mockRequest = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        educationLevel: 'UNIVERSITY',
        institution: 'Universidad de Buenos Aires',
        degree: 'Ingeniería en Sistemas',
        graduationYear: 2020,
        currentPosition: 'Senior Developer',
        currentCompany: 'Tech Corp',
        totalExperience: 5,
        startDate: '2020-01-01',
        isCurrentlyWorking: true,
        experienceDescription: 'Desarrollo de aplicaciones web'
      }
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      })
    };
  });

  it('should create a candidate successfully', async () => {
    const mockCandidate = { id: 1, ...mockRequest.body };
    const prisma = new (require('@prisma/client').PrismaClient)();
    prisma.candidate.create.mockResolvedValueOnce(mockCandidate);

    await createCandidate(mockRequest as Request, mockResponse as Response, prisma);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(responseObject).toEqual({
      success: true,
      message: 'Candidato creado exitosamente',
      data: mockCandidate
    });
  });

  it('should return 400 for invalid email', async () => {
    mockRequest.body.email = 'invalid-email';

    await createCandidate(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.success).toBe(false);
    expect(responseObject.errors).toContain('El email no es válido');
  });

  it('should return 400 for invalid phone format', async () => {
    mockRequest.body.phone = '1234567890'; // Missing + prefix

    await createCandidate(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.success).toBe(false);
    expect(responseObject.errors).toContain('El teléfono debe tener formato internacional (ej: +1234567890)');
  });

  it('should return 400 for duplicate email', async () => {
    const prisma = new (require('@prisma/client').PrismaClient)();
    prisma.candidate.create.mockRejectedValueOnce({
      code: 'P2002',
      message: 'Unique constraint failed on the fields: (`email`)'
    });

    await createCandidate(mockRequest as Request, mockResponse as Response, prisma);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.success).toBe(false);
    expect(responseObject.message).toBe('El email ya está registrado');
  });

  it('should return 400 for missing required fields', async () => {
    mockRequest.body = {
      firstName: 'John',
      lastName: 'Doe'
      // Missing other required fields
    };

    await createCandidate(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.success).toBe(false);
    expect(responseObject.errors.length).toBeGreaterThan(0);
  });
});

describe('getCandidateById', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;
  let prisma: any;

  beforeEach(() => {
    responseObject = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      })
    };
    prisma = new (require('@prisma/client').PrismaClient)();
  });

  it('should return candidate data for valid id', async () => {
    mockRequest = { params: { id: '1' } };
    const mockCandidate = { id: 1, firstName: 'Test', lastName: 'User' };
    prisma.candidate.findUnique.mockResolvedValueOnce(mockCandidate);

    const { getCandidateById } = require('../controllers/candidate.controller');
    await getCandidateById(mockRequest as Request, mockResponse as Response, prisma);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject.success).toBe(true);
    expect(responseObject.data).toEqual(mockCandidate);
  });

  it('should return 404 if candidate not found', async () => {
    mockRequest = { params: { id: '2' } };
    prisma.candidate.findUnique.mockResolvedValueOnce(null);

    const { getCandidateById } = require('../controllers/candidate.controller');
    await getCandidateById(mockRequest as Request, mockResponse as Response, prisma);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(responseObject.success).toBe(false);
    expect(responseObject.message).toBe('Candidato no encontrado');
  });

  it('should return 404 for invalid id', async () => {
    mockRequest = { params: { id: 'abc' } };

    const { getCandidateById } = require('../controllers/candidate.controller');
    await getCandidateById(mockRequest as Request, mockResponse as Response, prisma);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(responseObject.success).toBe(false);
    expect(responseObject.message).toBe('ID de candidato inválido');
  });
});

describe('listCandidates', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;
  let prisma: any;

  beforeEach(() => {
    responseObject = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      })
    };
    prisma = new (require('@prisma/client').PrismaClient)();
  });

  it('should return paginated candidates', async () => {
    mockRequest = { query: { limit: '2', offset: '0' } };
    const mockCandidates = [
      { id: 1, firstName: 'A', lastName: 'B' },
      { id: 2, firstName: 'C', lastName: 'D' }
    ];
    prisma.candidate.findMany.mockResolvedValueOnce(mockCandidates);
    prisma.candidate.count.mockResolvedValueOnce(5);

    const { listCandidates } = require('../controllers/candidate.controller');
    await listCandidates(mockRequest as Request, mockResponse as Response, prisma);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject.success).toBe(true);
    expect(responseObject.data).toEqual(mockCandidates);
    expect(responseObject.meta.total).toBe(5);
    expect(responseObject.meta.limit).toBe(2);
    expect(responseObject.meta.offset).toBe(0);
    expect(responseObject.meta.count).toBe(2);
  });

  it('should filter candidates by name', async () => {
    mockRequest = { query: { name: 'Test' } };
    const mockCandidates = [{ id: 1, firstName: 'Test', lastName: 'User' }];
    prisma.candidate.findMany.mockResolvedValueOnce(mockCandidates);
    prisma.candidate.count.mockResolvedValueOnce(1);

    const { listCandidates } = require('../controllers/candidate.controller');
    await listCandidates(mockRequest as Request, mockResponse as Response, prisma);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject.data).toEqual(mockCandidates);
    expect(responseObject.meta.total).toBe(1);
  });

  it('should return empty array if no candidates found', async () => {
    mockRequest = { query: { name: 'NoExiste' } };
    prisma.candidate.findMany.mockResolvedValueOnce([]);
    prisma.candidate.count.mockResolvedValueOnce(0);

    const { listCandidates } = require('../controllers/candidate.controller');
    await listCandidates(mockRequest as Request, mockResponse as Response, prisma);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject.data).toEqual([]);
    expect(responseObject.meta.total).toBe(0);
  });
});

describe('uploadCandidateCv', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;
  let prisma: any;

  beforeEach(() => {
    responseObject = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      })
    };
    prisma = new (require('@prisma/client').PrismaClient)();
  });

  it('should return 400 if no file is uploaded', async () => {
    mockRequest = { params: { id: '1' }, file: undefined } as any;
    const { uploadCandidateCv } = require('../controllers/candidate.controller');
    await uploadCandidateCv(mockRequest as Request, mockResponse as Response, prisma);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.success).toBe(false);
    expect(responseObject.message).toBe('No se subió ningún archivo');
  });

  it('should return 400 for invalid candidate id', async () => {
    mockRequest = { params: { id: 'abc' }, file: { path: 'fake/path/cv.pdf' } } as any;
    const { uploadCandidateCv } = require('../controllers/candidate.controller');
    await uploadCandidateCv(mockRequest as Request, mockResponse as Response, prisma);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.success).toBe(false);
    expect(responseObject.message).toBe('ID de candidato inválido');
  });

  it('should return 404 if candidate does not exist', async () => {
    mockRequest = { params: { id: '1' }, file: { path: 'fake/path/cv.pdf' } } as any;
    prisma.candidate.findUnique.mockResolvedValueOnce(null);
    const { uploadCandidateCv } = require('../controllers/candidate.controller');
    await uploadCandidateCv(mockRequest as Request, mockResponse as Response, prisma);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(responseObject.success).toBe(false);
    expect(responseObject.message).toBe('Candidato no encontrado');
  });

  it('should update candidate cvPath and return success', async () => {
    mockRequest = { params: { id: '1' }, file: { path: '/some/abs/path/uploads/cv/cv-1-123.pdf' } } as any;
    prisma.candidate.findUnique.mockResolvedValueOnce({ id: 1 });
    prisma.candidate.update.mockResolvedValueOnce({ id: 1, cvPath: 'uploads/cv/cv-1-123.pdf' });
    const { uploadCandidateCv } = require('../controllers/candidate.controller');
    await uploadCandidateCv(mockRequest as Request, mockResponse as Response, prisma);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject.success).toBe(true);
    expect(responseObject.data.cvPath).toContain('uploads/cv/cv-1-123.pdf');
  });
}); 