import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      px: 2,
    }}
  >
    <Typography variant="h3" gutterBottom>
      Bienvenido a AI4Devs
    </Typography>
    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
      Gestiona tus candidatos fácilmente
    </Typography>
    <Button
      component={Link}
      to="/candidates/add"
      variant="contained"
      size="large"
      sx={(theme) => ({
        minWidth: 200,
        py: 1.5,
        fontSize: '1.1rem',
        color:
          theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.common.black,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          color:
            theme.palette.mode === 'light'
              ? theme.palette.common.white
              : theme.palette.common.black,
        },
      })}
    >
      Agregar Candidato
    </Button>
  </Box>
);
