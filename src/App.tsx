import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/gjgks01" replace />} />
        <Route path="/gjgks01" element={<LandingPage />} />
        <Route path="/gjgks02" element={<LandingPage />} />
        <Route path="/gjgks03" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;