import { useState } from "react";

import project01 from '../assets/wallhaven.jpg';
import project02 from '../assets/zyvwyy.jpg';
import project03 from '../assets/jxyopy.jpg';
import project04 from '../assets/sunset-over-a-forest-lake-bright-colors-colorful-grass-flowers-setting-sun-clouds-in-the-styl-397835753.png';
import Navbar from "../components/navbar";
const projects = [
  {
    name: 'Project 1',
    image: project01,
    description: 'Description of Project 1',
  },
  {
    name: 'Project 2',
    image: project02,
    description: 'Description of Project 2',
  },
  {
    name: 'Project 3',
    image: project03,
    description: 'Description of Project 3',
  },
  {
    name: 'Project 4',
    image: project04,
    description: 'Description of Project 4',
  },
];

const Projects = () => {
  const ProjectCard = ({ name, image, description }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(`Searching for ${searchTerm}`);
  };

  return (
    <>
    <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-cover bg-center h-64 flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=600')" }}>
          <h1 className="text-3xl font-bold">Projects</h1>
        </div>

        <div className="container mx-auto mt-20">
          <div className="flex flex-col items-center justify-center">
            <div className="">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full h-10 px-4 pr-10 text-sm bg-white border border-gray-300 rounded-lg lg:w-80 focus:outline-none"
                placeholder="Search term..."
              />
            </div>
            {searchTerm && (
              <div className="mt-10 text-2xl">Search term: {searchTerm}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
