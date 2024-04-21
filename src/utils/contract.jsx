import { getContract, createThirdwebClient } from "@thirdweb-dev/react";
// import { mumbai } from "@thirdweb-dev/chains";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";

const client = createThirdwebClient({
  clientId: "1971b4ffc7b4410e350ba34c8694d7df",
});
// get a contract
export const Contract = getContract({
  // the client you have created via `createThirdwebClient()`
  client,
  // the chain the contract is deployed on
  chain: PolygonAmoyTestnet,
  // the contract's address
  address: `${import.meta.env.VITE_CONTRACT_ADDRESS}`,
});
