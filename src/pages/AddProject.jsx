import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { supabase } from "../client";

const ProjectForm = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser();
  }, []);
  async function checkUser() {
    await supabase.auth.getUser().then((res) => {
      setUser(res.data.user?.user_metadata.user_name);
    });
  }

  const [step, setStep] = useState(1);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [socialMedia1, setSocialMedia1] = useState("");
  const [socialMedia2, setSocialMedia2] = useState("");
  const [socialMedia3, setSocialMedia3] = useState("");
  const [image, setImage] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const maxWordCount = 10000;

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    setWordCount(words.length);
    if (words.length <= maxWordCount) {
      setDescription(text);
    } else {
      setDescription(words.slice(0, maxWordCount).join(" "));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      console.error("Please select an image");
      return;
    }

    if (!user) {
      alert("Login with GitHub");
      console.error("Please log in with GitHub");
      return;
    }

    // Form data for uploading the image
    const formDataImage = new FormData();
    formDataImage.append("file", image);

    try {
      // Upload image to NFT.storage
      const uploadResponse = await fetch("https://api.nft.storage/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_NFTSTORAGE_KEY}`,
        },
        body: formDataImage,
      });

      const imageData = await uploadResponse.json();
      const cid = imageData.value.cid;
      const imageHash = `https://nftstorage.link/ipfs/${cid}/${image.name}`;
      // Create form data
      const formData = new FormData();
      formData.append("name", projectName);
      formData.append("description", description);
      formData.append("url", githubLink);
      formData.append("twitter", socialMedia1);
      formData.append("instagram", socialMedia2);
      formData.append("linkedin", socialMedia3);
      formData.append("owner", user);
      formData.append("image", imageHash);

      // POST request to backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}projects`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from backend:", response.data);
      // Handle success, show success message, redirect, etc.
      alert("Project registered");
    } catch (error) {
      console.error("Error:", error);
      // Handle error, show error message, etc.
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={`form-step ${step === 1 ? "active" : ""}`}>
            <label
              htmlFor="projectName"
              className="block text-md font-medium text-gray-300  text-center"
            >
             Add Your Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="bg-cyan-400 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={`form-step ${step === 2 ? "active" : ""}`}>
            <label
              htmlFor="description"
              className="block text-md font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows="5"
              maxLength="1000"
              className="mt-1 block w-full text-white bg-black px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <p className="text-sm text-gray-300">
              {wordCount}/{maxWordCount} words
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handlePrev}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-cyan-400 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={`form-step ${step === 3 ? "active" : ""}`}>
            <div className="mb-4">
              <label
                htmlFor="githubLink"
                className="block text-md font-medium text-gray-300"
              >
                GitHub Link
              </label>
              <input
                type="text"
                id="githubLink"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="socialMedia1"
                className="block text-md font-medium text-gray-300"
              >
                Twitter
              </label>
              <input
                type="text"
                id="socialMedia1"
                value={socialMedia1}
                onChange={(e) => setSocialMedia1(e.target.value)}
                className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="socialMedia2"
                className="block text-md font-medium text-gray-300"
              >
                Instagram
              </label>
              <input
                type="text"
                id="socialMedia2"
                value={socialMedia2}
                onChange={(e) => setSocialMedia2(e.target.value)}
                className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="socialMedia3"
                className="block text-md font-medium text-gray-300"
              >
                LinkedIn
              </label>
              <input
                type="text"
                id="socialMedia3"
                value={socialMedia3}
                onChange={(e) => setSocialMedia3(e.target.value)}
                className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-md font-medium text-gray-300"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
                accept="image/*"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handlePrev}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Previous
              </button>
              <button
                type="submit"
                className=" bg-cyan-400 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
    <div className="p-5">
      <Navbar  />
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className=" max-w-xl w-full mx-auto p-8 bg-black mb-32 rounded-lg shadow-lg">
          <h2 className="text-5xl font-bold mb-16 text-center text-white">
            Submit Your Project
          </h2>
          <form onSubmit={handleSubmit} className="form-container">
            {renderStep()}
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProjectForm;
