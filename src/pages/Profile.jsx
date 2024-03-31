import { useState, useEffect } from "react";
import { supabase } from "../client";
import Navbar from "../components/navbar";
import axios from "axios";
import { ethers } from "ethers";
import { abi } from "../abi/abi";
import { useAddress } from "@thirdweb-dev/react";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [isWithdrawalFormOpen, setIsWithdrawalFormOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [Address, setAddress] = useState(0);
  const [WalletLinked, setWalletLinked] = useState(false);
  const address = useAddress();

  useEffect(() => {
    setAddress(address);
    checkUser();
  }, [address]);

  async function checkUser() {
    await supabase.auth.getUser().then((res) => {
      fetchUserData(res.data.user?.user_metadata.user_name);
    });
  }

  async function fetchUserData(username) {
    try {
      const token = import.meta.env.VITE_GITHUB_KEY;
      const headers = {
        Authorization: `token ${token}`,
      };
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        { headers }
      );
      setUserData(response.data);
      await fetchBalance(username);
      await checkUsernameWallet(username);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  async function fetchBalance(username) {
    try {
      // Connect to your Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Create a contract instance
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x49cfeE607B35Af7d3d8D957Be30601a2576FC487",
        abi,
        signer
      );
      // Call the getBalance function of the contract
      const balance = await contract.getBalance(username);

      // Convert balance from Wei to Ether
      const balanceInEther = ethers.utils.formatEther(balance);
      setBalance(balanceInEther);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }
  async function checkUsernameWallet(username) {
    try {
      // Connect to your Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Create a contract instance
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0x49cfeE607B35Af7d3d8D957Be30601a2576FC487",
        abi,
        signer
      );
      // Call the getBalance function of the contract
      const wallet = await contract.getAddressForUsername(username);
      console.log(wallet);
      if (wallet == "0x0000000000000000000000000000000000000000") {
        setWalletLinked(false);
      } else if (wallet == Address) {
        setWalletLinked(true);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  async function handleWalletConnect(username) {
    try {
      // Make a POST request to /user/assign
      const response = await axios.post("/user/assign", {
        username: userData.name,
        walletAddress: Address, // Assuming Address holds the wallet address
      });

      // Log the response
      console.log("Assignment response:", response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  const handleWithdraw = async () => {
    setIsWithdrawalFormOpen(true);
  };

  const handleCloseWithdrawalForm = () => {
    setIsWithdrawalFormOpen(false);
    setWithdrawalAmount(""); // Reset withdrawal amount
  };

  const handleConfirmWithdrawal = async () => {
    // Handle withdrawal logic here
    console.log("Withdrawal amount:", withdrawalAmount);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x49cfeE607B35Af7d3d8D957Be30601a2576FC487",
      abi,
      signer
    );
    try {
      const tx = await contract.withdraw(
        userData?.name,
        ethers.utils.parseEther(withdrawalAmount)
      );
      await tx.wait();
      console.log("Result:", tx);
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
    // Close the withdrawal form
    handleCloseWithdrawalForm();
  };

  if (userData === null) {
    return (
      <>
        <Navbar />
        <div className="bg-slate-950 text-white text-4xl flex items-center justify-center h-screen">
          Please sign in to view your profile.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="flex items-center">
            <img
              src={userData?.avatar_url}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{userData?.name}</h2>
              <p className="text-gray-400">ID: {userData?.id}</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Wallet: {Address}</h3>
            <h3 className="text-lg font-semibold">Status: {"Address"}</h3>
            {Address && !WalletLinked && (
              <button
                onClick={handleWalletConnect}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Balance: {balance} MATIC</h3>
            <button
              onClick={handleWithdraw}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Withdraw Balance
            </button>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Projects</h3>
          </div>
        </div>
      </div>

      {/* Withdrawal Form */}
      {isWithdrawalFormOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-white mb-4">
              Withdraw Balance
            </h2>
            <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              placeholder="Enter amount to withdraw"
              className="w-full border border-gray-700 rounded-md px-3 py-2 mb-4 text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseWithdrawalForm}
                className="text-gray-300 hover:text-white mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWithdrawal}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
