import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const userName = "Sanju K S";

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          CrimeMap
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/evidence" className="text-white text-xl">
            Evidence
          </Link>
          <div className="text-white text-xl">
            {userName}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;