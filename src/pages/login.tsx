import { useState, useEffect } from "react";
import { supabase } from "../client";
import React from "react";
import Navbar from "../components/navbar";

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkUser();
  }, []);
  async function checkUser() {
    await supabase.auth.getUser().then((res) => {
      setUser(res.data.user?.user_metadata.user_name);
      setLoading(false);
    });
  }
  const handleClick = () => {
    signInWithGithub();
  };
  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }
  if (loading == true) {
    return (
      <>
        <Navbar />

        <div className="bg-black flex items-center justify-center h-screen text-white text-4xl">
          loading
        </div>
      </>
    );
  }
  if (user) {
    return (
      <>
        <Navbar />
        <div className="bg-black h-screen  flex flex-col justify-center items-center text-white">
          <h1>Hello, {user}</h1>
          <button className="bg-red-400  p-3 rounded-md" onClick={signOut}>
            Sign out
          </button>
        </div>
      </>
    );
  }
  if (loading == false) {
    return (
      <>
        <Navbar />

        <div className="bg-black h-screen  flex justify-center items-center text-white">
          <button
            className="bg-blue-500 p-3 rounded-md"
            onClick={() => {
              handleClick();
            }}
          >
            Login with Github
          </button>
        </div>
      </>
    );
  }
};

export default Login;
