import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Board from './components/Board';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folder1" element={<div>Folder 1 Content</div>} />
        <Route path="/folder2" element={<Board/>} />
        <Route path="/folder3" element={<div>Folder 3 Content</div>} />
        <Route path="/folder4" element={<div>Folder 4 Content</div>} />
        <Route path="/folder5" element={<div>Folder 5 Content</div>} />
      </Routes>
    </Router>
  );
}

export default App;
