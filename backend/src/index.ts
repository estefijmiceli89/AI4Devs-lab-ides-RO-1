import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import candidateRoutes from './routes/candidate.routes';
import cvRoutes from './routes/cv.routes';

dotenv.config();

export const app = express();

const port = 3010;

// Configuración de CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // URL del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/candidates', cvRoutes);
app.use('/api/candidates', candidateRoutes);

// Ruta de prueba
app.get('/', (_req, res) => {
  res.send('Hola LTI!');
});

// Middleware de manejo de errores
app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
