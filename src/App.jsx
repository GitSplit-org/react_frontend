import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import OpenProject from "./pages/openProject"; // corrected the import path
import Withdraw from "./pages/withdraw"
import Login from "./pages/login"
import Projects from "./pages/projects"; // corrected the component name

function App() {
  return (
    <>
  <div className="bg-black h-screen">
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/openproject" element={<OpenProject />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        </div>
   
    </>
  );
}

export default App;
