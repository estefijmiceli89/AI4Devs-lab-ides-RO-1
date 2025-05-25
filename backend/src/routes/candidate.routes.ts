import { Router } from 'express';
import { candidateController } from '../controllers/candidate.controller';

const router = Router();

// GET /api/candidates - Get all candidates with pagination
router.get('/', candidateController.getAllCandidates);

// GET /api/candidates/:id - Get a single candidate
router.get('/:id', candidateController.getCandidateById);

// POST /api/candidates - Create a new candidate
router.post('/', candidateController.createCandidate);

// PUT /api/candidates/:id - Update a candidate
router.put('/:id', candidateController.updateCandidate);

// DELETE /api/candidates/:id - Delete a candidate
router.delete('/:id', candidateController.deleteCandidate);

export default router;
