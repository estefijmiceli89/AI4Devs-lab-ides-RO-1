import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sistema ATS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Gestión de Candidatos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/candidates/add')}
          sx={{ mt: 4 }}
        >
          Agregar Nuevo Candidato
        </Button>
      </Box>
    </Container>
  );
}; 