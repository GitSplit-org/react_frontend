import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const ProjectPage = () => {
  const [project, setProject] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [RepoData, setRepoData] = useState();

  const fetchRepoData = async (url) => {
    try {
      const urlParts = url.split("/");
      const owner = urlParts[3]; // GitSplit-org
      const repo = urlParts[4]; // Next_frontend
      const token =
        "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";
      const headers = {
        Authorization: `token ${token}`,
      };

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,
        { headers }
      );
      setRepoData(response.data);

      const responseContributors = await axios.get(
        response.data.contributors_url,
        { headers } // Pass headers for authentication
      );
      const contributorsData = responseContributors.data;

      // Calculate total number of commits
      const totalCommits = contributorsData.reduce(
        (total, contributor) => total + contributor.contributions,
        0
      );

      // Calculate percentage of contribution for each contributor
      const contributorsWithPercentage = contributorsData.map(
        (contributor) => ({
          contributor: contributor, // Include the original contributor object
          login: contributor.login,
          contributions: contributor.contributions,
          percentage: (
            (contributor.contributions / totalCommits) *
            100
          ).toFixed(2),
        })
      );

      console.log(contributorsWithPercentage);
      setContributors(contributorsWithPercentage);
    } catch (error) {
      console.error("Error fetching repository data:", error);
      setRepoData(null);
    }
  };
  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}project?id=${id}`
      );
      setProject(response.data.data);
      if (response.data.data.url) {
        fetchRepoData(response.data.data.url);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, []);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Cover Photo */}
      <div
        className="h-40 bg-cover pl-5 pt-5 bg-center bg-gray-600"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        {/* Profile Picture */}
        <div className="mx-auto mt-16">
          <img
            src={project.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <div className="container mx-auto py-12 pt-20">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <div className="flex space-x-4">
                <a
                  href={project.instagram}
                  className="text-gray-600 hover:text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a
                  href={project.facebook}
                  className="text-gray-600 hover:text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a
                  href={project.twitter}
                  className="text-gray-600 hover:text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{project.description}</p>
          </div>
          <div className="bg-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold mb-2">Contributors</h2>
            <ul>
              {contributors.map((contributor, index) => (
                <li
                  key={index}
                  className="flex items-center py-2 border-b border-gray-300"
                >
                  <img
                    src={contributor.contributor.avatar_url}
                    alt={contributor.login}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{contributor.login}</p>
                    <p className="text-gray-600">
                      {contributor.contributions} contributions
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
