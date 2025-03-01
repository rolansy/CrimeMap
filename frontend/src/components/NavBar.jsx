const NavBar = () => {
  const userName = "Sanju K S";

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          CrimeMap
        </div>
        <div className="text-white text-xl">
          {userName}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;