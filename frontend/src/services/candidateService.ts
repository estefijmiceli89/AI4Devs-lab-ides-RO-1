import axios from 'axios';
import { CreateCandidateDto, UpdateCandidateDto } from '../types/candidate';

const API_URL = 'http://localhost:3010/api';

export const candidateService = {
  async getAllCandidates(page = 1, limit = 10) {
    const response = await axios.get(`${API_URL}/candidates`, {
      params: { page, limit },
    });
    return response.data;
  },

  async getCandidateById(id: number) {
    const response = await axios.get(`${API_URL}/candidates/${id}`);
    return response.data;
  },

  async createCandidate(data: CreateCandidateDto) {
    const response = await axios.post(`${API_URL}/candidates`, data);
    return response.data;
  },

  async getCandidates() {
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
  },

  async getCandidate(id: string) {
    const response = await axios.get(`${API_URL}/candidates/${id}`);
    return response.data;
  },

  async updateCandidate(id: string, data: Partial<CreateCandidateDto>) {
    const response = await axios.put(`${API_URL}/candidates/${id}`, data);
    return response.data;
  },

  async deleteCandidate(id: string) {
    const response = await axios.delete(`${API_URL}/candidates/${id}`);
    return response.data;
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
  },
};
