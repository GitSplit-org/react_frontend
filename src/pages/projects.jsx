import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}projects`
        );
        setProjects(response.data.data); // Adjusted to access projects under 'data' key
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const ProjectCard = ({
    id,
    name,
    url,
    description,
    twitter,
    instagram,
    linkedin,
    owner,
    image,
  }) => {
    return (
      <div
        key={id}
        className="bg-slate-900 rounded-lg shadow-lg p-4 border border-white hover:cursor-pointer"
        onClick={() => {
          navigate({
            pathname: `/project`,
            search: `?id=${id}`,
          });
        }}
      >
        <div className="relative h-40  mb-4 rounded-lg overflow-hidden">
          <img src={image} alt={name} className="object-cover w-full h-full" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300">{description}</p>
        <p className="text-gray-300">Owner: {owner}</p>
        <div>
          <a
            href={url}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          {twitter && (
            <a
              href={twitter}
              className="text-blue-500 hover:underline ml-2"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              className="text-blue-500 hover:underline ml-2"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              className="text-blue-500 hover:underline ml-2"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(`Searching for ${searchTerm}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div
          className="bg-cover bg-center h-64 flex items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=600')",
          }}
        >
          <h1 className="text-3xl font-bold">Projects</h1>
        </div>

        <div className="container mx-auto mt-20">
          <div className="flex flex-col items-center justify-center">
            <div className="">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-10 w-full h-10 px-4 pr-10 text-sm bg-white border border-gray-300 rounded-lg lg:w-80 focus:outline-none"
                placeholder="Search project..."
              />
            </div>
            {searchTerm && (
              <div className="mt-10 text-2xl">Search term: {searchTerm}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
