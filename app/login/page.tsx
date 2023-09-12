"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, redirect } from "next/navigation";

const Page = () => {
  const session = useSession();
  if (session.status === "authenticated") {
    redirect("/admin");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const error = useSearchParams().get("error");
  return (
    <div className="flex justify-center items-center bg-purple-200 min-h-screen">
      <div className="bg-white p-8 rounded-lg w-[60vh] flex justify-around flex-col gap-y-2">
        <div className="admin-login">
          <h1 className="text-3xl text-center">Student Login</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const res = await signIn("customer", {
                  username,
                  password,
                  redirect: true,
                  callbackUrl: "/",
                });
              } catch (e) {}
            }}
          >
            {error ? (
              <p className="bg-red-300 border border-red-500 text-red-500 rounded p-2 my-2 break-words">
                {error}
              </p>
            ) : null}
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
        <div className="admin-login">
          <h1 className="text-3xl text-center">Admin Login</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const res = await signIn("admin", {
                  username,
                  password,
                  redirect: true,
                  callbackUrl: "/admin",
                });
              } catch (e) {}
            }}
          >
            {error ? (
              <p className="bg-red-300 border border-red-500 text-red-500 rounded p-2 my-2 break-words">
                {error}
              </p>
            ) : null}
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
    </div>
  );
};

export default Page;
