import React from "react";
import Header from "@/components/Header";
import { BsCheckLg } from "react-icons/bs";

const Page = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header title="Settings" />
      <div className="p-4">
        <div className="bg-white px-8 py-8 border rounded-lg grid gap-4 w-full m-auto">
          <h1 className="text-3xl text-center font-bold">Settings</h1>
          <div className="grid sm:grid-cols-2">
            <p className="text-xl sm:place-self-end">Opening time</p>
            <input
              type="time"
              className="border rounded-lg border-gray-500 sm:ml-4 pl-2 py-1 text-lg sm:place-self-start"
            />
          </div>
          <div className="grid sm:grid-cols-2">
            <p className="text-xl sm:place-self-end">Closing time</p>
            <input
              type="time"
              className="border rounded-lg border-gray-500 sm:ml-4 pl-2 py-1 text-lg sm:place-self-start"
            />
          </div>
          <button className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-lg flex items-center sm:place-self-center place-self-end">
            <BsCheckLg /> Apply
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;
