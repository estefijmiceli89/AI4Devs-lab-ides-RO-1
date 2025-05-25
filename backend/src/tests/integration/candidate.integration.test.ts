import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../../app';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

const prisma = new PrismaClient();

describe('Candidate API Integration Tests', () => {
  beforeAll(async () => {
    // Clean up the database before tests
    await prisma.candidate.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const testCandidate = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    educationLevel: 'UNIVERSITY',
    institution: 'Universidad de Buenos Aires',
    degree: 'Ingeniería en Sistemas',
    graduationYear: 2020,
    currentPosition: 'Senior Developer',
    currentCompany: 'Tech Corp',
    totalExperience: 5,
    startDate: '2020-01-01',
    isCurrentlyWorking: true,
    experienceDescription: 'Desarrollo de aplicaciones web',
  };

  let createdCandidateId: string;

  describe('POST /api/candidates', () => {
    it('should create a new candidate', async () => {
      const response = await request(app)
        .post('/api/candidates')
        .send(testCandidate)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.firstName).toBe(testCandidate.firstName);
      expect(response.body.email).toBe(testCandidate.email);

      createdCandidateId = response.body.id;
    });

    it('should return 400 for invalid candidate data', async () => {
      const invalidCandidate = {
        name: '', // Invalid empty name
        email: 'invalid-email', // Invalid email format
        phone: '', // Invalid empty phone
        skills: [], // Invalid empty skills
        experience: -1, // Invalid negative experience
        education: '', // Invalid empty education
        status: 'INVALID', // Invalid status
      };

      const response = await request(app)
        .post('/api/candidates')
        .send(invalidCandidate)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should create a new candidate named Estefania Miceli', async () => {
      const estefaniaCandidate = {
        firstName: 'Estefania',
        lastName: 'Miceli',
        email: 'estefania.miceli@example.com',
        phone: '+541112345678',
        educationLevel: 'UNIVERSITY',
        institution: 'UBA',
        degree: 'Ingeniería',
        graduationYear: 2022,
        currentPosition: 'Developer',
        currentCompany: 'Tech SA',
        totalExperience: 3,
        startDate: '2020-01-01',
        isCurrentlyWorking: true,
        experienceDescription: 'Desarrollo de software',
        endDate: null,
      };
      const response = await request(app)
        .post('/api/candidates')
        .send(estefaniaCandidate)
        .expect(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.firstName).toBe('Estefania');
      expect(response.body.lastName).toBe('Miceli');
      expect(response.body.email).toBe('estefania.miceli@example.com');
    });
  });

  describe('GET /api/candidates', () => {
    it('should return paginated list of candidates', async () => {
      const response = await request(app).get('/api/candidates').expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.meta).toHaveProperty('total');
      expect(response.body.meta).toHaveProperty('page');
      expect(response.body.meta).toHaveProperty('limit');
    });
  });

  describe('GET /api/candidates/:id', () => {
    it('should return a specific candidate', async () => {
      const response = await request(app)
        .get(`/api/candidates/${createdCandidateId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdCandidateId);
      expect(response.body.firstName).toBe(testCandidate.firstName);
    });

    it('should return 404 for non-existent candidate', async () => {
      await request(app).get('/api/candidates/non-existent-id').expect(404);
    });
  });

  describe('PUT /api/candidates/:id', () => {
    it('should update a candidate', async () => {
      const updateData = {
        firstName: 'John Updated',
        totalExperience: 6,
      };

      const response = await request(app)
        .put(`/api/candidates/${createdCandidateId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.firstName).toBe(updateData.firstName);
      expect(response.body.totalExperience).toBe(updateData.totalExperience);
    });

    it('should return 404 when updating non-existent candidate', async () => {
      await request(app)
        .put('/api/candidates/non-existent-id')
        .send({ name: 'Updated' })
        .expect(404);
    });
  });

  describe('DELETE /api/candidates/:id', () => {
    it('should delete a candidate', async () => {
      await request(app)
        .delete(`/api/candidates/${createdCandidateId}`)
        .expect(204);

      // Verify the candidate is deleted
      await request(app)
        .get(`/api/candidates/${createdCandidateId}`)
        .expect(404);
    });

    it('should return 404 when deleting non-existent candidate', async () => {
      await request(app).delete('/api/candidates/non-existent-id').expect(404);
    });
  });
});
