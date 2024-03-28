import { useState } from 'react';
import Navbar from '../components/navbar';

const ProjectForm = () => {
  const [step, setStep] = useState(1);

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [socialMedia1, setSocialMedia1] = useState('');
  const [socialMedia2, setSocialMedia2] = useState('');
  const [socialMedia3, setSocialMedia3] = useState('');
  const [image, setImage] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const maxWordCount = 200;

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    setWordCount(words.length);
    if (words.length <= maxWordCount) {
      setDescription(text);
    } else {
      setDescription(words.slice(0, maxWordCount).join(' '));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      projectName,
      description,
      githubLink,
      socialMedia1,
      socialMedia2,
      socialMedia3,
      image
    });
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
          <div className={`form-step ${step === 1 ? 'active' : ''}`}>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-300">Project Name</label>
            <input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            <div className="mt-4 flex justify-end">
              <button onClick={handleNext} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={`form-step ${step === 2 ? 'active' : ''}`}>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows="5"
              maxLength="1000"
              className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <p className="text-sm text-gray-300">{wordCount}/{maxWordCount} words</p>
            <div className="mt-4 flex justify-between">
              <button onClick={handlePrev} className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">Previous</button>
              <button onClick={handleNext} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={`form-step ${step === 3 ? 'active' : ''}`}>
            <div className="mb-4">
              <label htmlFor="githubLink" className="block text-sm font-medium text-gray-300">GitHub Link</label>
              <input type="text" id="githubLink" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
              <label htmlFor="socialMedia1" className="block text-sm font-medium text-gray-300">Social Media Link 1</label>
              <input type="text" id="socialMedia1" value={socialMedia1} onChange={(e) => setSocialMedia1(e.target.value)} className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="socialMedia2" className="block text-sm font-medium text-gray-300">Social Media Link 2</label>
              <input type="text" id="socialMedia2" value={socialMedia2} onChange={(e) => setSocialMedia2(e.target.value)} className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="socialMedia3" className="block text-sm font-medium text-gray-300">Social Media Link 3</label>
              <input type="text" id="socialMedia3" value={socialMedia3} onChange={(e) => setSocialMedia3(e.target.value)} className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-300">Image</label>
              <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} className="mt-1 block w-full text-white bg-gray-800 px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" accept="image/*" />
            </div>
            <div className="mt-4 flex justify-between">
              <button onClick={handlePrev} className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">Previous</button>
              <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="max-w-md w-full mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Submit Your Project</h2>
          <form onSubmit={handleSubmit} className="form-container">
            {renderStep()}
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
