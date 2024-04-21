import { useState, useEffect } from "react";
import { supabase } from "../client";
import Navbar from "../components/navbar";
import axios from "axios";
import { ethers } from "ethers";
import { abi } from "../abi/abi";
import { useAddress } from "@thirdweb-dev/react";
import {
  faLocationDot,
  faCopy,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectCard from "../utils/ProjectCard";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../utils/textRevelCard";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [isWithdrawalFormOpen, setIsWithdrawalFormOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [Address, setAddress] = useState(0);
  const [WalletLinked, setWalletLinked] = useState(false);
  const [Loading, setLoading] = useState(true);
  const address = useAddress();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address).then(
      () => {
        alert("Address copied to clipboard");
      },
      (error) => {
        console.error("Unable to copy to clipboard.", error);
      }
    );
  };

  useEffect(() => {
    setAddress(address);
    checkUser();
    setLoading(false);
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
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        { headers }
      );

      setUserData(response.data);

      checkUsernameWallet(username);
      await fetchBalance(username);
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
        `${import.meta.env.VITE_CONTRACT_ADDRESS}`,
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
        `${import.meta.env.VITE_CONTRACT_ADDRESS}`,
        abi,
        signer
      );
      // Call the getBalance function of the contract
      const wallet = await contract.getAddressForUsername(username);
      console.log(wallet);
      if (wallet == 0x0000000000000000000000000000000000000000) {
        setWalletLinked(false);
      } else if (wallet == Address) {
        setWalletLinked(true);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  async function handleWalletConnect() {
    try {
      // Make a POST request to /user/assign
      if (address == 0x0000000000000000000000000000000000000000) {
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/assign`,
        {
          username: userData.login,
          walletAddress: Address,
        },
        console.log(userData)
      );
      if (response.status == 200) {
        alert("wallet linked");
        // Log the response
        console.log("Assignment response:", response.data);
      }
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
      `${import.meta.env.VITE_CONTRACT_ADDRESS}`,
      abi,
      signer
    );
    try {
      const tx = await contract.withdraw(
        userData?.login,
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
  if (Loading) {
    return;
  }
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
      <div className="pt-5 px-5">
        <Navbar />
        <div className="bg-[#2c2c2c] text-white mx-20 rounded-3xl">
          <div className=" text-white flex border-2 border-white rounded-md">
            <div className="bg-slate-950 flex p-16 flex-1">
              <div className="flex flex-col w-fit justify-start">
                <img
                  src={userData?.avatar_url}
                  alt="Profile"
                  className="w-64 h-64 rounded-2xl mr-4"
                />
              </div>
              <div className="">
                <p className="text-3xl font-bold text-center mt-4">
                  {userData?.name}
                </p>
                <div className="mt-2 ml-4 flex text-white justify-between">
                  <div className="text-center">
                    {userData?.followers} <p>followers</p>
                  </div>
                  <div className="text-center">
                    {userData?.following} <p>following</p>
                  </div>
                </div>
                {userData?.location && (
                  <div className=" flex gap-3 pt-3 ml-5">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p className="text-sm ">{userData?.location}</p>
                  </div>
                )}
                {userData?.blog && (
                  <div className=" flex gap-3 pt-3 ml-5">
                    <FontAwesomeIcon icon={faLink} />
                    <a
                      href={userData?.blog}
                      target="_blank"
                      className="text-sm "
                    >
                      {userData?.blog}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="border-2 flex-1 flex flex-col items-center">
              {Address && !WalletLinked && (
                <div className="mt-4 bg-slate-500 p-4 flex flex-col items-center rounded-md">
                  Wallet not linked to Github account
                  <button
                    onClick={handleWalletConnect}
                    className="bg-blue-500 mt-2 p-2 text-white w-32 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
              {Address && WalletLinked && (
                <div className="mt-4 bg-slate-500 p-4 flex flex-col items-center rounded-md">
                  Wallet linked to Github account
                  <div className="flex">
                    <TextRevealCard
                      text="Revel Your wallet address"
                      revealText={`${Address}`}
                      className="mr-2 mt-3"
                    />
                    <button onClick={copyToClipboard}>
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>
                </div>
              )}
              {Address && !WalletLinked && (
                <div className="mt-10 items-center flex">
                  <TextRevealCard
                    text="Revel Your wallet address"
                    revealText={`  ${Address}`}
                    className=" "
                  />
                  <button onClick={copyToClipboard}>
                    {" "}
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
              )}
              <div className="flex flex-col items-center mt-8 flex-1">
                <div className="mt-4 ">
                  <h3 className="text-lg font-semibold">
                    Balance: {balance} MATIC
                  </h3>
                  <button
                    onClick={handleWithdraw}
                    className="bg-cyan-500 text-white w-36 p-2 rounded-md hover:bg-cyan-600 transition duration-300"
                  >
                    Withdraw Balance
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-screen text-white text-xl p-16 ">
            <p className="pb-10">Project Uploaded</p>

            <div className=" bg-[#1E1E1E] rounded-2xl h-">
              <ProjectCard
                name={"Blog Website"}
                image={"/project/img1.png"}
                about={
                  "You can write and read blogs in it and it is built on NextJS, its backend uses mongodb. And it is also mobile responsive"
                }
                edit={"/"}
                code={"/"}
                // visit={"/"}
              />
            </div>
          </div>
          {/* Withdrawal Form */}
          {isWithdrawalFormOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-75  flex justify-center items-center">
              <div className="bg-[#000000] p-5  w-1/4 h-1/3 rounded-lg shadow-md">
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
                <div className="flex justify-end mt-10">
                  <button
                    onClick={handleCloseWithdrawalForm}
                    className="text-gray-300 hover:text-white mr-4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmWithdrawal}
                    className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition duration-300"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
