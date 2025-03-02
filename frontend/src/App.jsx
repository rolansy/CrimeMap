import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import EvidenceStorageSystem from './pages/evidence/evidence';
import HomePage from './pages/Home'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/evidence" element={<EvidenceStorageSystem />} />
      </Routes>
    </Router>
  );
}

export default App;