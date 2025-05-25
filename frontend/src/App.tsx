import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { AddCandidate } from './pages/AddCandidate';
import { Home } from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidates/add" element={<AddCandidate />} />
          {/* Aquí se agregarán más rutas cuando las creemos */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
