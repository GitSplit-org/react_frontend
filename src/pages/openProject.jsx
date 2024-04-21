import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialDropdown from "../utils/socialDropdown";
import {
  faDonate,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import LikeButton from "../utils/likebutton";
import {
  faInstagram,
  faFacebook,
  faXTwitter,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Navbar from "../components/navbar";
import { ethers } from "ethers";
import { abi } from "../abi/abi";

const ProjectPage = () => {
  // const web3 = new Web3(window.ethereum);
  // const contract = new web3.eth.Contract(
  //   abi,
  //   "0x49cfeE607B35Af7d3d8D957Be30601a2576FC487"
  // );
  const [loading, setloading] = useState(true);
  const [project, setProject] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [searchParams] = useSearchParams();
  const [totalContributors, setTotalContributors] = useState(0);
  const id = searchParams.get("id");
  // const [RepoData, setRepoData] = useState();
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const fetchRepoData = async (url) => {
    try {
      const urlParts = url.split("/");
      const owner = urlParts[3]; // GitSplit-org
      const repo = urlParts[4]; // Next_frontend
      const token = import.meta.env.VITE_GITHUB_KEY;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,
        { headers }
      );
      // setRepoData(response.data);

      const responseContributors = await axios.get(
        response.data.contributors_url,
        { headers } // Pass headers for authentication
      );
      const contributorsData = responseContributors.data;
      const totalContributorsCount = contributorsData.length;

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
      setTotalContributors(totalContributorsCount);
    } catch (error) {
      console.error("Error fetching repository data:", error);
      // setRepoData(null);
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
        setloading(true);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleDonateButtonClick = () => {
    setIsDonationFormOpen(true);
  };

  const handleDonateFormSubmit = async (e) => {
    e.preventDefault();
    // Handle donation form submission
    console.log("Donation amount:", donationAmount);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      `${import.meta.env.VITE_CONTRACT_ADDRESS}`,
      abi,
      signer
    );
    // const usernames = ["user1", "user2"];
    // const amountsInWei = [
    //   ethers.utils.parseEther("1"),
    //   ethers.utils.parseEther("2"),
    // ];
    //
    const split = [];
    const usernames = [];
    contributors.forEach((contributor) => {
      const splitAmount = (
        (contributor.percentage / 100) *
        donationAmount
      ).toFixed(2);
      console.log(splitAmount);
      split.push(ethers.utils.parseEther(splitAmount));
      usernames.push(contributor.login);
      console.log(usernames);
      console.log(split);
    });

    //
    try {
      const tx = await contract.deposit(usernames, split, {
        value: split.reduce((a, b) => a.add(b), ethers.BigNumber.from(0)),
      });
      await tx.wait();
      console.log("Result:", tx);
      // Reset donation form state
      setDonationAmount("");
      setIsDonationFormOpen(false);
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  };

  if (!project) {
    return <div className="bg-black text-white min-h-screen">Loading...</div>;
  }
  if (loading) {
    <>
      <div className="bg-cyan-400"> </div>
    </>;
  }

  return (
    <>
      <div>
        <div className=" p-5  ">
          <Navbar />
          <div className=" text-white max-h-full bg-black rounded-[50px] p-2 mt-5 mr-16 ml-16 ">
            {/* Cover Photo */}
            <div
              className="h-50 bg-cover pl-5 pt-5 bg-center bg-gray-800 rounded-[30px] relative"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              {/* Fade-out overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1E1E1E]  "></div>

              {/* Profile Picture */}
              <div className="mx-10 mt-52   h-72 relative z-10  flex flex-col justify-end pb-2 ">
                <h1 className="text-[80px]   font-bold">{project.name}</h1>
              </div>
            </div>
            <div className="flex  bg-gradient-to-b bg-[#1E1E1E] rounded-b-[50px]">
              <div className="flex-1 overflow-y-auto scroll-smooth focus:scroll-auto h-screen mx-10 ">
                {/* Left side content */}
                <div className="p-4">
                  <h1 className="text-[32px] font-semibold text-cyan-200 pt-10 w-auto">
                    Where Contributions Matter, Funds Flow Fairly
                  </h1>
                  <div className="mt-4 flex  font-bold">
                    <div className="text-md text-cyan-400 w-1/3">
                      Category
                      <br />
                      <div className="text-white">Blockchain</div>
                    </div>
                    <div className="text-md text-cyan-400 w-1/3">
                      Published
                      <div className="text-white">04/03/2024</div>
                    </div>
                    <div className="text-md text-cyan-400 w-1/3">
                      contributors
                      <br />
                      <div className="text-white">{totalContributors}</div>
                    </div>
                  </div>
                  <div className="h-auto pt-10">
                    <div className="text-[32px] font-semibold">
                      Description{" "}
                    </div>
                    <div className="p-2">{project.description}</div>
                  </div>
                </div>
              </div>

              <div className="w-1/3 h-screen p-4  bg-[#1E1E1E] rounded-b-[50px]  ">
                {/* Right side content */}
                <div className="pt-10 flex justify-center items-center gap-5 ">
                  <div className="p-1 w-2/3 font-bold   bg-[#313338] rounded-lg">
                    <LikeButton initialLikes={0} />
                  </div>
                  <div className="w-1/5 p-1 flex justify-center bg-[#313338] rounded-lg">
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="text-4xl p-1.5 rounded-lg"
                    />
                  </div>

                  <div className="p-1 w-1/5  bg-[#313338] flex justify-center rounded-lg">
                    <SocialDropdown />
                  </div>
                </div>

                <div className="flex text-2xl  items-center mt-5  rounded-lg  bg-[#313338]  justify-center ">
                  <button
                    onClick={handleDonateButtonClick}
                    className=" bg-[#313338] text-white p-5 w-full   rounded-lg hover:bg-teal-800 transition duration-300  flex gap-20 justify-evenly items-center"
                  >
                    <FontAwesomeIcon icon={faDonate} className="" />
                    {/* Donate Icon */}
                    Donate
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </button>
                </div>
                <div className="px-6 py-4 ">
                  <h2 className="text-lg font-semibold mb-2">Contributors</h2>
                  <ul>
                    {contributors.map((contributor, index) => (
                      <li
                        key={index}
                        className="flex items-center py-2 border-b border-gray-700"
                      >
                        <img
                          src={contributor.contributor.avatar_url}
                          alt={contributor.login}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <p className="font-semibold">{contributor.login}</p>
                          <p className="text-gray-400">
                            {contributor.contributions} contributions
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className="container mx-auto  py-12 pt-20">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <div className="flex space-x-4">
                  <a
                    href={project.instagram}
                    className="text-gray-400 hover:text-blue-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </a>
                  <a
                    href={project.facebook}
                    className="text-gray-400 hover:text-blue-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                  </a>
                  <a
                    href={project.twitter}
                    className="text-gray-400 hover:text-blue-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Twitter
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </a>
                </div>
              </div>
              <p className="text-gray-400 mt-2">{project.description}</p>
            </div>
            <div className="bg-gray-800 px-6 py-4">
              <h2 className="text-lg font-semibold mb-2">Contributors</h2>
              <ul>
                {contributors.map((contributor, index) => (
                  <li
                    key={index}
                    className="flex items-center py-2 border-b border-gray-700"
                  >
                    <img
                      src={contributor.contributor.avatar_url}
                      alt={contributor.login}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{contributor.login}</p>
                      <p className="text-gray-400">
                        {contributor.contributions} contributions
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
            {/* Donation Button */}

            {/* Donation Form Overlay */}
            {isDonationFormOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex  justify-center items-center">
                <form
                  onSubmit={handleDonateFormSubmit}
                  className="bg-[#1E1E1E] rounded-lg shadow-lg w-1/3  h-1/3 flex flex-col"
                >
                  <div className="m-5 ">
                    <h2 className="text-2xl font-semibold text-white mb-4 ">
                      Donate
                    </h2>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="Enter donation amount"
                      className=" text-black w-full border px-2  border-gray-700 rounded-md py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <div className="flex justify-end mt-20">
                      <button
                        type="button"
                        onClick={() => setIsDonationFormOpen(false)}
                        className="text-gray-400 hover:text-gray-200 mr-4"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#3d3d3d] text-white py-2 px-4 rounded-md hover:bg-teal-300 transition duration-300"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
