import Navbar from "../components/navbar";

import video from '../assets/landingpage.mp4';

import { Animator, ScrollContainer, ScrollPage, batch, Fade,FadeUp, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
// import { GlobeDemo } from "../components/demoglobe";


const Home = () => {
 
  const ZoomOutScrollIN = batch(StickyIn(), FadeIn(), ZoomIn());
  const ZoomInScrollOut = batch(StickyOut(), FadeIn(), ZoomOut(),  );
  const changeXandY = batch(
    StickyOut(), 
    Move(ZoomOut(-10, 100, -100), -10, -500) // Move to top-right after centered
  );
  

  
  

  return (
  
    
    <>
      <Navbar />
      {/* <GlobeDemo/> */}
      <ScrollContainer>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -250))}>
      <span className=" bg-gradient-to-r from-white  to-purple-400 inline-block text-transparent text-center bg-clip-text text-9xl font-bold h-52 w-screen "> Gitsplit <br/> 
      <p className="text-6xl pt-10  text-purple-500  ">Where Contributions Matter, Funds Flow Fairly.</p>   </span>
    </Animator>
  </ScrollPage>
  <ScrollPage >
 
   <Animator animation={ZoomInScrollOut} className="flex  justify-center items-center ">
       <span style={{ transform: 'translateZ(0px) translateX(0%) translateY(0%)', position: 'relative', zIndex: 0 }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
         </video>
       </span>
       </Animator> 
      </ScrollPage>
      {/* <Animator animation={ZoomInScrollOut} className="flex justify-center items-center h-screen"> 
      <span className=" relative " style={{ transform: 'translateZ(0px) translateX(0%) translateY(0%)', zIndex: -20 ,  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator>
      <Animator animation={ZoomInScrollOut} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(0px) translateX(250%) translateY(150%)', position: 'relative', zIndex: 2}}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
       
      </span>
      </Animator>
      <Animator animation={ZoomInScrollOut} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(150%) translateY(-150%)', position: 'relative', zIndex: -20 }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator>
      <Animator animation={ZoomInScrollOut} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(-450%) translateY(-150%)', position: 'relative', zIndex: -20 }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator> */}
      {/* <Animator animation={ZoomOutScrollIN} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(50%)', position: 'relative', zIndex: -20  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator> */}
      {/* <Animator animation={ZoomOutScrollIN} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(50%)', position: 'relative', zIndex: -20  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator>
      <Animator animation={ZoomOutScrollIN} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(50%)', position: 'relative', zIndex: -20  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator>
      
      <Animator animation={ZoomOutScrollIN} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(50%)', position: 'relative', zIndex: -20  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
    </Animator> */}

  
  <ScrollPage>
    <Animator animation={batch(StickyIn(), FadeIn())}>
      <span className=" text-9xl flex justify-center   ">BlockChain</span>
    </Animator>
  </ScrollPage>
  <ScrollPage>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
      <span style={{ fontSize: "40px" }}>
        <Animator animation={MoveIn(-1000, 0)}>Hello Guys 👋🏻</Animator>
        <Animator animation={MoveIn(1000, 0)}>Nice to meet you 🙋🏻‍♀️</Animator>
        - I'm Dante Chun -
        <Animator animation={MoveOut(1000, 0)}>Good bye ✋🏻</Animator>
        <Animator animation={MoveOut(-1000, 0)}>See you 💛</Animator>
      </span>
    </div>
  </ScrollPage>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky())}>
      <span style={{ fontSize: "40px" }}>Done</span>
      <br/>
      <span style={{ fontSize: "30px" }}>
        There's FadeAnimation, MoveAnimation, StickyAnimation, ZoomAnimation
      </span>
    </Animator>
  </ScrollPage>
</ScrollContainer>

      <div className="flex flex-col items-center justify-center h-screen pb-20 bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">
          Support Open Source Development
        </h1>
        <p className="text-2xl">Donate to GitHub Projects</p>
        <div className="pt-2">
          <button className=" border-2 bg-stone-600 text-white p-1">
            Get Started
          </button>
          <button className="pl-4">learn more..</button>
        </div>
      </div>
      <div className=" bg-slate-400 h-screen ">
        <div className="flex h-5/6 pl-20 pr-20 pt-10 ">
          <div className="w-1/2  p-4 ease-in-out bg-gradient-to-t from-white to-white hover:to-lime-100">
            {/* Content for the left pane */}
            <h2 className="text-xl font-bold">Gitsplit Grants</h2>
            <p className="text-2xl pt-5">Get funding & grow your ecosystem </p>
            <p className="pb-3">
              Participate in our quartely grants programfor open-source &
              impact-oriented projects.
            </p>
            <button className="border-2  rounded-md border-black p-1 ">
              view Grants{" "}
            </button>
          </div>
          <div className="w-1/2  p-4 ease-in-out bg-gradient-to-t from-white to-white hover:to-blue-100">
            {/* Content for the right pane */}
            <h2 className="text-xl font-bold">Grant Program</h2>
            <p className="text-2xl pt-5">Launch & grow your grants program </p>
            <p className="pb-3">
              Easily manage your onchine program with our customizable grants
              solution .
            </p>
            <button className="border-2  rounded-md border-black p-1 ">
              view Grants{" "}
            </button>
          </div>
        </div>
      </div>
      <div className=" h-screen pt-10 ">
        <p className="text-4xl font-extrabold text-cyan-900 flex justify-center ">
          Raise money with full transparency
        </p>
        <p className=" text-lg font-bold  pt-2 flex justify-center">
          {" "}
          We do the paperwork so you can focus on your mission.
        </p>
        <div className="flex justify-center">
          <img
            src="https://www.surveylegend.com/wordpress/wp-content/uploads/2021/02/organizational-culture-2.png"
            alt="React Image"
            width={600}
          />
        </div>
      </div>
    </>

)
  }

export default Home;