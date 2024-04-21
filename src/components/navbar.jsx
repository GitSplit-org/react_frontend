import { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import logo from "../assets/icon.png"

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
 
  return (
    <nav className="bg-transparent shadow-sm rounded-full z-4 p-1 relative">
      <div className="container mx-auto px-4 py-2 md:flex md:items-center md:justify-between">
        {/* GitSplit Logo and Hamburger Icon */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* GitSplit Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              width={62}
              
              className=""
              // alt="Flowbite Logo"
            />
            <div className="text-xl font-semibold space-x-2 dark:text-white">
              <span>GitSplit</span>
            </div>
          </Link>

          {/* Hamburger Icon for Responsive */}
          <div className="md:hidden">
            <button
              className="text-gray-800 dark:text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6h18a1 1 0 010 2H3a1 1 0 010-2zM3 11h18a1 1 0 110 2H3a1 1 0 110-2zM3 16h18a1 1 0 110 2H3a1 1 0 110-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-2 mt-3 md:mt-0 gap-9">
          <Link
            to="/addproject"
            className={`transition duration-300 ease-in-out ${
              activeButton === "add" ? "text-indigo-600" : "text-gray-800"
            } hover:text-gray-600 dark:text-white dark:hover:text-gray-400`}
            onClick={() => handleButtonClick("add")}
          >
            Add Project
          </Link>

          <Link
            to="/projects"
            className={`transition duration-300 ease-in-out ${
              activeButton === "support" ? "text-indigo-600" : "text-gray-800"
            } hover:text-gray-600 dark:text-white dark:hover:text-gray-400`}
            onClick={() => handleButtonClick("support")}
          >
            Explore
          </Link>

          <Link
            to="/login"
            className={`transition duration-300 ease-in-out ${
              activeButton === "login" ? "text-indigo-600" : "text-gray-800"
            } hover:text-gray-600 dark:text-white dark:hover:text-gray-400`}
            onClick={() => handleButtonClick("login")}
          >
            Login
          </Link>

          <div>
            <ConnectWallet theme={"dark"} modalSize={"wide"} />
          </div>
          <Link
            to="/profile"
            onClick={() => handleButtonClick("login")}
          >
            <FontAwesomeIcon
              className="pl-3"
              icon={faUser}
              size="lg"
              color="white"
            />
          </Link>
        </div>

        {/* Responsive Menu */}
        {showMenu && (
          <div className="md:hidden absolute top-16 left-0 right-0  text-right bg-transparent shadow-md py-2 rounded-lg z-10">
            <div className="flex flex-col space-y-2">
              <Link
                to="/addproject"
                className="text-gray-800 dark:text-white hover:text-gray-600"
                onClick={() => {
                  toggleMenu();
                  handleButtonClick("add");
                }}
              >
                Add Project
              </Link>
              <Link
                to="/projects"
                className="text-gray-800 dark:text-white hover:text-gray-600"
                onClick={() => {
                  toggleMenu();
                  handleButtonClick("support");
                }}
              >
                Explore
              </Link>
              <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:text-gray-600"
                onClick={() => {
                  toggleMenu();
                  handleButtonClick("login");
                }}
              >
                Login
              </Link>
              <div>
                <ConnectWallet theme={"dark"} modalSize={"wide"} />
              </div>
              <Link
                to="/profile"
                className="text-gray-800 dark:text-white hover:text-gray-600"
                onClick={() => {
                  toggleMenu();
                  handleButtonClick("login");
                }}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
