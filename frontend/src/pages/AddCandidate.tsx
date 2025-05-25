import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Alert, Snackbar } from '@mui/material';
import { CandidateForm } from '../components/CandidateForm';
import { CreateCandidateDto } from '../types/candidate';
import { candidateService } from '../services/candidateService';

export const AddCandidate: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: CreateCandidateDto, cvFile: File | null) => {
    try {
      await candidateService.createCandidate(data, cvFile);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el candidato');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CandidateForm onSubmit={handleSubmit} />

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Candidato creado exitosamente
        </Alert>
      </Snackbar>
    </Container>
  );
};
