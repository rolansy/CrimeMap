import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Folder from './pages/Folder';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folder1" element={<Folder/>} />
        <Route path="/folder2" element={<div>Folder 2 Content</div>} />
        <Route path="/folder3" element={<div>Folder 3 Content</div>} />
        <Route path="/folder4" element={<div>Folder 4 Content</div>} />
        <Route path="/folder5" element={<div>Folder 5 Content</div>} />
      </Routes>
    </Router>
  );
}

export default App;
