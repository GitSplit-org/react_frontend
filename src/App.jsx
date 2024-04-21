import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AddProject from "./pages/AddProject";
import OpenProject from "./pages/openProject"; // corrected the import path
import Withdraw from "./pages/withdraw";
import Login from "./pages/login";
import Projects from "./pages/projects"; // corrected the component name
import ProfilePage from "./pages/Profile";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/addproject",
    element: <AddProject />,
  },
  {
    path: "/project",
    element: <OpenProject />,
  },
  {
    path: "/withdraw",
    element: <Withdraw />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <div className="bg-black">
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider
            activeChain={PolygonAmoyTestnet}
            // activeChain="mumbai"
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
            <RouterProvider router={router} />{" "}
          </ThirdwebProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
