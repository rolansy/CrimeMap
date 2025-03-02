import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import EvidenceStorageSystem from './pages/evidence/evidence';
import HomePage from './pages/Home';
import Board from './components/Board'; // Import the Board component

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/evidence" element={<EvidenceStorageSystem />} />
        <Route path="/folder2" element={<Board />} /> {/* Add the route for the Board component */}
      </Routes>
    </Router>
  );
}

export default App;