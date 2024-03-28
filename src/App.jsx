import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import OpenProject from "./pages/openProject"; // corrected the import path

import Projects from "./pages/projects"; // corrected the component name
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

function App() {
  return (
    <>
      <ThirdwebProvider
        activeChain="ethereum"
        clientId="1971b4ffc7b4410e350ba34c8694d7df"
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
          walletConnect(),
        ]}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/openproject" element={<OpenProject />} />
          </Routes>
        </BrowserRouter>
      </ThirdwebProvider>
    </>
  );
}

export default App;
