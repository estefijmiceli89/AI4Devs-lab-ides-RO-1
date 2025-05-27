import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import { lightTheme, darkTheme } from './theme';
import { CandidateForm } from './components/CandidateForm';
import { ThemeToggle } from './components/ThemeToggle';
import { Breadcrumb } from './components/Breadcrumb';
import { Home } from './pages/Home';

const getBreadcrumbItems = (pathname: string) => {
  if (pathname === '/candidates/add') {
    return [{ label: 'Inicio', path: '/' }, { label: 'Agregar Candidato' }];
  }
  return [{ label: 'Inicio' }];
};

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbItems(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" color="default" elevation={1} sx={{ width: '100vw', left: 0 }}>
          <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Modo
            </Typography>
            <ThemeToggle onToggle={toggleTheme} />
          </Toolbar>
        </AppBar>
        <Box sx={{ px: { xs: 0, sm: 3 }, pt: 3, flexGrow: 1 }}>
          <Breadcrumb items={breadcrumbItems} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidates/add" element={<CandidateForm />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
