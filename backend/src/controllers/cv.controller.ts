import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export const uploadCV = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    // Verificar si el candidato existe
    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) }
    });

    if (!candidate) {
      // Eliminar el archivo subido si el candidato no existe
      fs.unlinkSync(file.path);
      return res.status(404).json({ error: 'Candidato no encontrado' });
    }

    // Si ya existe un CV, eliminarlo
    if (candidate.cvPath) {
      const oldCvPath = path.join(__dirname, '../../', candidate.cvPath);
      if (fs.existsSync(oldCvPath)) {
        fs.unlinkSync(oldCvPath);
      }
    }

    // Obtener la ruta relativa del archivo
    const relativePath = path.relative(path.join(__dirname, '../../'), file.path);

    // Actualizar la ruta del CV en la base de datos
    const updatedCandidate = await prisma.candidate.update({
      where: { id: parseInt(id) },
      data: {
        cvPath: relativePath
      }
    });

    return res.json({
      message: 'CV subido exitosamente',
      candidate: updatedCandidate
    });
  } catch (error) {
    console.error('Error al subir CV:', error);
    // Si hay un error, intentar eliminar el archivo subido
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error al eliminar archivo temporal:', unlinkError);
      }
    }
    return res.status(500).json({ error: 'Error al procesar la subida del CV' });
  }
};

export const getCV = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) }
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidato no encontrado' });
    }

    if (!candidate.cvPath) {
      return res.status(404).json({ error: 'El candidato no tiene un CV subido' });
    }

    const cvPath = path.join(__dirname, '../../', candidate.cvPath);

    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({ error: 'El archivo CV no existe' });
    }

    return res.download(cvPath);
  } catch (error) {
    console.error('Error al obtener CV:', error);
    return res.status(500).json({ error: 'Error al procesar la solicitud del CV' });
  }
}; 
 