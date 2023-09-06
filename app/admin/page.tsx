"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("admin", {
        username,
        password,
        redirect: true,
        callbackUrl: "/admin/dashboard",
      });
      console.log(res);
      fetch(`http://localhost/a`);
    } catch (e) {
      console.log("AAAAAAAAAAAABBBBBBBB");
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center bg-purple-200 min-h-screen">
      <div className="bg-white p-8 rounded-lg md:w-[30vw]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center">Admin Login</h1>
          <div className="my-2">
            <p className="font-bold text-lg">Username</p>
            <input
              type="text"
              className="border border-gray-500 rounded-lg p-2 w-full focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-2">
            <p className="font-bold text-lg">Password</p>
            <input
              type="password"
              className="border border-gray-500 rounded-lg p-2 w-full focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg float-right">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
