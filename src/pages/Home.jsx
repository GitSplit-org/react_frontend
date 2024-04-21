import Navbar from "../components/navbar";
import video1 from "../assets/1.mp4";
import Box from "../assets/box.png";
import Blockchain from "../assets/key1.png";
import Fund from "../assets/Decentralized.svg";
import Wheel from "../assets/wheel.svg";
import circle from "../assets/img-PnJF8EabIhtdtaxj3RntNOBT-removebg-preview.png";
import mobile from "../assets/Screenshot_20240414_155130.png";
import secure from "../assets/icons8-secure-64.png";
import showcase from "../assets/Desktop.svg";

import {
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  ZoomIn,
  Animation,
  Animator,
} from "react-scroll-motion";
// import { GlobeDemo } from "../components/demoglobe";

const Home = () => {
  const Boxx = batch(FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());

  return (
    <>
      <ScrollContainer>
        <div>
          <video
            autoPlay
            muted
            loop
            style={{
              position: " absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: "2", // Place the video behind other content
            }}
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            style={{ position: "relative", zIndex: "2", padding: "20px" }}
            className=" text-white h-screen "
          >
            <Navbar />
            {/* Content that will be on top of the video */}
            <div className="flex flex-col justify-center items-center mt-56 ">
              <h1 className=" text-4xl font-bold"> G I T S P L I T</h1>
              <br />
              <p className="text-6xl font-black px-10 mt-24">
                From Code to Contribution: Empowering{" "}
              </p>
              <p className="text-6xl  font-black h-28 p-5  text-[#33e0db] ">
                Open Source with GitSplit
              </p>
              <button className="p-4 font-bold text-xl"> LEARN MORE </button>
            </div>
          </div>
        </div>

        <ScrollPage>
          <Animator animation={Boxx}>
            <div className="flex">
              <div className="w-1/2 ">
                <img src={Box} alt="GitSplit Logo" />
              </div>

              <div className="w-1/2">
                <p className="text-2xl font-semibold text-white p-10 mt-20  text-justify leading-loose">
                  Introducing GitSplit: the groundbreaking platform
                  revolutionizing open-source funding. GitSplit empowers
                  developers by providing a decentralized crowdfunding solution
                  where contributions are fairly rewarded. With seamless GitHub
                  integration, transparent blockchain technology, and equitable
                  fund distribution, GitSplit is where innovation meets
                  opportunity. Join GitSplit to fuel open-source projects,
                  collaborate with creators worldwide, and shape the future of
                  software development.
                </p>
              </div>
            </div>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
      <div className="relative overflow-hidden h-screen flex">
        <div className="absolute top-0 right-0 w-full   ">
          <div className="text-white text-5xl  p-4 animate-slide flex  justify-stretch gap-24 ">
            <div className="flex">
              <img
                src={Wheel}
                alt="icon"
                width={60}
                className=" flex mt-4 mb-5 spin-svg"
              />

              <p className="pt-5  font-extrabold mx-10">Key Features</p>
            </div>
            <div className="flex gap-10  ">
              <img
                src={Wheel}
                alt="icon"
                width={60}
                className=" flex mt-4  mb-5 spin-svg space-x-20 "
              />

              <p className="pt-5 font-black mx-10 ">Key Features</p>
            </div>
            <div className="flex gap-10  ">
              <img
                src={Wheel}
                alt="icon"
                width={60}
                className=" flex mt-4 mb-5 spin-svg "
              />

              <p className="pt-5 font-black mx-10">Key Features</p>
            </div>
            <div className="flex gap-10  ">
              <img
                src={Wheel}
                alt="icon"
                width={60}
                className=" flex mt-4 mb-5 spin-svg"
              />

              <p className="pt-5 font-black mx-10">Key Features</p>
            </div>
            <div className="flex gap-10  ">
              <img
                src={Wheel}
                alt="icon"
                width={60}
                className=" flex mt-4 mb-5 spin-svg"
              />

              <p className="pt-5 font-black mx-10">Key Features</p>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-1/2  text-white  flex   flex-col  justify-center p-32  text-start pt-5 mt-64">
          <img src={Blockchain} alt="icon" width={60} className=" flex  mb-5" />
          <p className=" font-extrabold text-4xl ">Blockchain Fund Transfers</p>
          <p className="mt-5 text-justify text-xl text-gray-400 ">
            GitSplit uses blockchain for secure and transparent fund transfers.
            Smart contracts handle donations, eliminating intermediaries and
            reducing costs while providing a clear view of transactions.
          </p>
        </div>
        <div className="w-1/2 h-1/2  text-white  flex   flex-col  justify-center p-32  text-start pt-5  mt-64">
          <img src={Fund} alt="icon" width={60} className=" flex  mb-5" />
          <p className=" font-extrabold text-4xl ">Fair Fund Splitting</p>
          <p className="mt-5 text-justify text-xl text-gray-400 ">
            {" "}
            GitSplit's smart contracts ensure fair distribution of funds among
            contributors. Contributions like code commits are tracked and
            rewarded, promoting collaboration and meaningful participation.
          </p>
        </div>

        {/* </div> */}
      </div>
      <div className="flex  ">
        <div className="w-1/2 h-1/2  text-white  flex   flex-col  justify-center px-32  text-start ">
          <img src={secure} alt="icon" width={60} className=" flex  mb-5" />
          <p className=" font-extrabold text-4xl ">Secure Transactions</p>
          <p className="mt-5 text-justify text-xl text-gray-400 ">
            {" "}
            GitSplit employs blockchain encryption for fund security. User data
            is protected with encryption and multi-factor authentication,
            ensuring privacy and preventing unauthorized access.
          </p>
        </div>
        <div className="w-1/2 h-1/2  text-white  flex   flex-col  justify-center px-32  text-start  ">
          <img src={showcase} alt="icon" width={60} className=" flex  mb-5" />
          <p className=" font-extrabold text-4xl ">Project Showcase</p>
          <p className="mt-5 text-justify text-xl text-gray-400 ">
            {" "}
            GitSplit is a platform for open-source projects to showcase work.
            Project details, goals, and progress are displayed for users to
            discover and support, fostering community engagement and project
            visibility.
          </p>
        </div>
      </div>

      <div className="h-screen flex ">
        <div className="flex-1    mt-28 ">
          <div className="  flex justify-start px-24">
            <p className=" flex  mt-10 text-xl font-semibold ">Comming Soon</p>
          </div>
          <div className="mt-10 justify-center text-7xl  text-pretty px-24 font-black">
            <span className=" text-white">Access GitSplit from</span>
            <span className=" text-teal-500"> Desktop & Mobile</span>
          </div>
        </div>

        <div className="flex-1  max-w-1/2 relative overflow-hidden">
          <img
            src={circle}
            className="spin-img opacity-20 absolute "
            alt="Circle"
          />

          <img
            src={mobile}
            width={350}
            className="absolute bottom-0 right-52"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
