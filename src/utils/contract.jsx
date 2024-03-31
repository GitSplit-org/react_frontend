import { getContract, createThirdwebClient } from "thirdweb";
import { mumbai } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: "1971b4ffc7b4410e350ba34c8694d7df",
});
// get a contract
export const contract = getContract({
  // the client you have created via `createThirdwebClient()`
  client,
  // the chain the contract is deployed on
  chain: mumbai,
  // the contract's address
  address: "0x49cfeE607B35Af7d3d8D957Be30601a2576FC487",
});
