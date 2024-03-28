import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import OpenProject from "./pages/openProject"; // corrected the import path

import Projects from "./pages/projects"; // corrected the component name

function App() {
  return (
    <>
  
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/openproject" element={<OpenProject />} />
          </Routes>
        </BrowserRouter>
   
    </>
  );
}

export default App;
