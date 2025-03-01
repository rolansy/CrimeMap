import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Home = () => {
  const folders = [
    { name: '2025-PS01-123', link: '/folder1' },
    { name: '2025-PS01-223', link: '/folder2' },
    { name: '2025-PS01-222', link: '/folder3' },
    { name: '2025-PS01-342', link: '/folder4' },
    { name: '2025-PS01-253', link: '/folder5' },
  ];

  return (
    <>
    
    <div className="container mx-auto p-4 bg-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {folders.map((folder, index) => (
          <Link to={folder.link} key={index} className="text-center">
            <div className="flex flex-col items-center">
              <FaFolder className="text-6xl text-yellow-500" />
              <span className="mt-2 text-lg text-gray-700">{folder.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;