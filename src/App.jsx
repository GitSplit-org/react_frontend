import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import OpenProject from "./pages/openProject"; // corrected the import path
import Withdraw from "./pages/withdraw";
import Login from "./pages/login";
import Projects from "./pages/projects"; // corrected the component name
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <div className="bg-black h-screen">
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider
            activeChain="ethereum"
            clientId="1971b4ffc7b4410e350ba34c8694d7df"
            supportedWallets={[
              metamaskWallet(),
              coinbaseWallet({ recommended: true }),
              walletConnect(),
              localWallet(),
              embeddedWallet({
                auth: {
                  options: ["email", "google", "apple", "facebook"],
                },
              }),
            ]}
          >
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
          </ThirdwebProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
