import axios from 'axios';
import { Candidate, CreateCandidateDto, UpdateCandidateDto } from '../types/candidate';

const API_URL = 'http://localhost:3010/api';

export const candidateService = {
  async getAllCandidates(page = 1, limit = 10) {
    const response = await axios.get(`${API_URL}/candidates`, {
      params: { page, limit }
    });
    return response.data;
  },

  async getCandidateById(id: number) {
    const response = await axios.get(`${API_URL}/candidates/${id}`);
    return response.data;
  },

  async createCandidate(candidate: CreateCandidateDto, cvFile: File | null) {
    // Primero creamos el candidato
    const response = await axios.post(`${API_URL}/candidates`, candidate);
    const createdCandidate = response.data.data ? response.data.data : response.data;
    const candidateId = createdCandidate.id;

    console.log('Intentando subir CV:', { cvFile, candidateId });

    // Si hay un archivo CV, lo subimos
    if (cvFile && candidateId) {
      const formData = new FormData();
      formData.append('cv', cvFile);
      await axios.post(`${API_URL}/candidates/${candidateId}/cv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('CV subido correctamente');
    }

    return createdCandidate;
  },

  async updateCandidate(id: number, candidate: UpdateCandidateDto) {
    const response = await axios.put(`${API_URL}/candidates/${id}`, candidate);
    return response.data;
  },

  async deleteCandidate(id: number) {
    await axios.delete(`${API_URL}/candidates/${id}`);
  },

  async uploadCV(id: number, file: File) {
    const formData = new FormData();
    formData.append('cv', file);
    const response = await axios.post(`${API_URL}/candidates/${id}/cv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}; 