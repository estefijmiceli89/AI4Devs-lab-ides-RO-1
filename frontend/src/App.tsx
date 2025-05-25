import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AddCandidate } from './pages/AddCandidate';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidates/add" element={<AddCandidate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
