import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // Define a base button color and an active button color for consistency
  const buttonBaseStyle = "py-2 px-4 rounded-lg transition duration-300 ease-in-out";
  const buttonActiveColor = "bg-indigo-600 text-white";
  const buttonInactiveColor = "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600";

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm dark:bg-gray-900 p-2">
      <div className="container mx-auto px-4 py-2 md:flex md:items-center md:justify-between">
        {/* GitSplit Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <div className="text-xl font-semibold space-x-2 dark:text-white">
            <span>GitSplit</span>
            <span className="text-gray-400">|</span>
            <span className="text-lg text-gray-700 dark:text-gray-300">
              <Link to="/projects">Explorer</Link>
            </span>
          </div>
        </Link>

        {/* Navbar Links */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mt-3 md:mt-0">
          <Link
            to="/addproject"
            className={`${buttonBaseStyle} ${
              activeButton === 'add' ? buttonActiveColor : buttonInactiveColor
            }`}
            onClick={() => handleButtonClick('add')}
          >
            Add Project
          </Link>
          
          <Link
            to="/support"
            className={`${buttonBaseStyle} ${
              activeButton === 'support' ? buttonActiveColor : buttonInactiveColor
            }`}
            onClick={() => handleButtonClick('support')}
          >
            Support a Project
          </Link>

          <Link
            to="/login"
            className={`${buttonBaseStyle} ${
              activeButton === 'login' ? buttonActiveColor : buttonInactiveColor
            }`}
            onClick={() => handleButtonClick('login')}
          >
            Login
          </Link>

          <Link
            to="/connect-wallet"
            className={`${buttonBaseStyle} ${
              activeButton === 'connect' ? buttonActiveColor : buttonInactiveColor
            }`}
            onClick={() => handleButtonClick('connect')}
          >
            Connect Wallet
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
   