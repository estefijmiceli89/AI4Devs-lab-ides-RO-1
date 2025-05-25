import { Router } from 'express';
import { uploadCV, getCV } from '../controllers/cv.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// Ruta para subir/actualizar CV
router.post('/:id/cv', upload.single('cv'), uploadCV);

// Ruta para descargar CV
router.get('/:id/cv', getCV);

export default router;
