import express from 'express';
import cors from 'cors';
import path from 'path';
import candidateRoutes from './routes/candidate.routes';
import cvRoutes from './routes/cv.routes';
import listEndpoints from 'express-list-endpoints';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Primero las rutas de CV
app.use('/api/candidates', cvRoutes);
// Luego las rutas de candidate
app.use('/api/candidates', candidateRoutes);

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

console.log('Rutas activas:', listEndpoints(app));

export default app;
