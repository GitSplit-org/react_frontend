import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { ConnectWallet } from "@thirdweb-dev/react";
//import { supabase } from "../client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm dark:bg-black p-2">
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
          </div>
        </Link>

        {/* Navbar Links */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mt-3 md:mt-0  gap-9">
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
          <Link to="/profile" onClick={() => handleButtonClick("login")}>
            <FontAwesomeIcon
              className="pl-3"
              icon={faUser}
              size="lg"
              color="white"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
