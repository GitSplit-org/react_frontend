import { useState, useEffect } from "react";
import { supabase } from "../client";
import Navbar from "../components/navbar";
import axios from "axios";
import { ethers } from "ethers";
import { abi } from "../abi/abi";
import { useAddress } from "@thirdweb-dev/react";
import { faLocationDot, faCopy } from "@fortawesome/free-solid-svg-icons";
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
      // const response = await axios.get(
      //   `https://api.github.com/users/${username}`,
      //   { headers }
      // );
      const response = await axios.get(
        `https://api.github.com/users/rushikeshnimkar`,
        { headers }
      );

      setUserData(response.data);
      console.log(response.data);
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
      if (wallet == "0x0000000000000000000000000000000000000000") {
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
      console.log(address);
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
      "0x49cfeE607B35Af7d3d8D957Be30601a2576FC487",
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

  // if (userData === null) {
  //   return (
  //     <>
  //       <Navbar />
  //       <div className="bg-slate-950 text-white text-4xl flex items-center justify-center h-screen">
  //         Please sign in to view your profile.
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
   <div className="pt-5 px-5">
  <Navbar />
  <div className="bg-black text-white flex">
    <div className="flex flex-col mt-16 ml-16 w-fit justify-start">
      <img
        src={userData?.avatar_url}
        alt="Profile"
        className="w-28 h-28 rounded-2xl mr-4"
      />
    </div>
    <div className="mt-16 ">
      <p className="text-md font-bold text-center mt-4">{userData?.name}</p>
      <div className=" flex gap-3 pt-3">
        <FontAwesomeIcon icon={faLocationDot} />
        <p className="text-sm ">{userData?.location}</p>
      </div>
    </div>
    <div className="flex-1 flex   justify-end mt-10 items-center">
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
         
    <div className="flex flex-col items-center mt-8 flex-1">
      <div className="mt-16 ">
        <h3 className="text-lg font-semibold">Balance: {balance} MATIC</h3>
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
<div>
<div className=" flex justify-evenly text-white ">
              <div className="text-center">
                {userData?.followers} <p>followers</p>
              </div>
              <div className="text-center">
                {userData?.following} <p>following</p>
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

  </>
//     <>
//     <div className="p-5">
//       <Navbar />
//       <div className=" flex justify-center mt-10   h-screen bg-black text-white">
//         <div className="w-full ">
//           <div className="flex  justify-center">
//             <img
//               src={userData?.avatar_url}
//               alt="Profile"
//               className="w-16 h-16 rounded-full mr-4 "
//             />
//           </div>
  //         <div className=" ">
  //           <div>
  //             <p className="text-md font-bold text-center mt-4">
  //               {userData?.name}
  //             </p>
  //             {/* <p className="text-sm   text-center mt-1 text-[#a8a9a9] ">{userData?.login}</p> */}
  //             <div className="flex    items-center">
  //               <div className="w-1/3"></div>
  // <div className="flex items-center  w-1/3 justify-center">
  //   <FontAwesomeIcon icon={faLocationDot} />
  //   <p className="text-sm ml-2  ">{userData?.location}</p>
  // </div>

//   <div className="flex items-center w-1/3  justify-end pr-10">
  //   <div className="text-center">
  //     <h3 className="text-lg font-semibold">
  //       Balance: {balance} MATIC
  //     </h3>
  //     <button
  //       onClick={handleWithdraw}
  //       className="bg-cyan-500 text-white w-36 p-2  rounded-md hover:bg-cyan-600 transition duration-300"
  //     >
  //       Withdraw Balance
  //     </button>
  //   </div>
  // </div>
// </div>

//             </div>
//           </div>

//           <div className="mt-6 flex justify-center ">
    //         <TextRevealCard
    //           text="Revel Your wallet address"
    //           revealText={`  ${Address}`}
    //           className=" "
    //         />
    //         <button onClick={copyToClipboard}>
    //           {" "}
    //           <FontAwesomeIcon icon={faCopy} />
    //         </button>
    //       </div>
    //       <div className="mt-5">
    //         {/* <button  className="copy-button">
    //   <i className="fas fa-copy "></i> Copy
    // </button> */}
            // <div className=" flex justify-evenly ">
            //   <div className="text-center">
            //     {userData?.followers} <p>followers</p>
            //   </div>
            //   <div className="text-center">
            //     {userData?.following} <p>following</p>
            //   </div>
            // </div>

//             <div className="flex justify-evenly mt-10">
//               <div>
//                 {/* <h3 className="text-lg font-semibold m-5">Status: {"Address"}</h3> */}
//                 {Address && !WalletLinked && (
//                   <button
//                     onClick={handleWalletConnect}
//                     className="bg-blue-500  text-white w-32 rounded-md hover:bg-blue-600 transition duration-300"
//                   >
//                     Connect Wallet
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="m-6 ">
//             <h3 className="text-2xl font-semibold pl-[10rem] ">Projects</h3>
//           </div>
//           <div className="flex flex-wrap items-center  w-screen bg-black justify-center flex-col lg:flex-row relative overflow-hidden ">
//       {/* <img
//         src="./star.jpg"
//         alt=""
//         className="h-full w-full object-cover opacity-20 absolute bottom-0"
//       /> */}
//       <div className="z-20 flex items-center justify-center  gap-3 m-2 flex-wrap">
        // <ProjectCard
        //   name={"Blog Website"}
        //   image={"/project/img1.png"}
        //   about={
        //     "You can write and read blogs in it and it is built on NextJS, its backend uses mongodb. And it is also mobile responsive"
        //   }
        //   edit={"/"}
        //   code={"/"}
        //   // visit={"/"}
        // />
//         <ProjectCard
//           name={"Imagzen 🖼️"}
//           image={"/project/img2.png"}
//           about={
//             "Meet IMAGZEN – the responsive image download app that lets you search and download images with ease."
//           }
//           edit={"/"}
//           code={"/"}
//           // visit={"/"}
//         />
//         <ProjectCard
//           name={"NextJs E commerce 🏪"}
//           image={"/project/img3.png"}
//           about={
//             "You can order clothes and create your own products and it is built on NextJS, its backend uses MongoDB. And it is also mobile responsive. And Test Account is = test@gmail.com and password = test4321"
//           }
//           edit={"/"}
//           code={"/"}
//           // visit={"/"}
//         />
//         <ProjectCard
//           name={"ChatGPT Clone 💬"}
//           image={"/project/img4.png"}
//           about={
//             "Similar to chatGPT, this platform is designed to assist users in addressing their queries. It's an excellent resource to tackle any code-related issue or inquiry you may have."
//           }
//           edit={"/"}
//           code={"/"}
//           // visit={"/"}
//         />
//         <ProjectCard
//           name={"Fitness Club 👊"}
//           image={"/project/img5.png"}
//           about={
//             "We're excited to introduce Gym-Exercise, the fitness platform that's open-source and designed to help you take charge of your health and fitness journey."
//           }
//           edit={"/"}
//           code={"/"}
//           visit={"/"}
//         />
//         <ProjectCard
//           name={"Youtube Clone 📹"}
//           image={"/project/img6.png"}
//           about={
//             "A YouTube clone that allows users to search and enjoy their favorite videos and songs is now available. This platform is also mobile-responsive, making it convenient for users on-the-go."
//           }
//           edit={"/"}
//           code={"/"}
//           visit={"/"}
//         />
//       </div>
//     </div>
//         </div>
//       </div>

      // {/* Withdrawal Form */}
      // {isWithdrawalFormOpen && (
      //   <div className="fixed inset-0 z-50 bg-black bg-opacity-75  flex justify-center items-center">
      //     <div className="bg-[#000000] p-5  w-1/4 h-1/3 rounded-lg shadow-md">
      //       <h2 className="text-lg font-semibold text-white mb-4">
      //         Withdraw Balance
      //       </h2>
      //       <input
      //         type="number"
      //         value={withdrawalAmount}
      //         onChange={(e) => setWithdrawalAmount(e.target.value)}
      //         placeholder="Enter amount to withdraw"
      //         className="w-full border border-gray-700 rounded-md px-3 py-2 mb-4 text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //       />
      //       <div className="flex justify-end mt-10">
      //         <button
      //           onClick={handleCloseWithdrawalForm}
      //           className="text-gray-300 hover:text-white mr-4"
      //         >
      //           Cancel
      //         </button>
      //         <button
      //           onClick={handleConfirmWithdrawal}
      //           className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition duration-300"
      //         >
      //           Confirm
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // )}
//       </div>
//     </>
  );
};

export default ProfilePage;
