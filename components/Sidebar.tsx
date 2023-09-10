"use client";

import Link from "next/link";
import { RxSketchLogo, RxDashboard } from "react-icons/rx";
import { BsListCheck } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import Image from "next/image";
import FoodieIcon from "./FoodieIcon";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/admin/dashboard">
            <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
              <FoodieIcon />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/admin/dashboard">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <RxDashboard size={20} />
            </div>
          </Link>
          <Link href="/admin/orders">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <BsListCheck size={20} />
            </div>
          </Link>
          <Link href="/admin/items">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <IoFastFoodOutline size={20} />
            </div>
          </Link>
          <Link href="/admin/settings">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <FiSettings size={20} />
            </div>
          </Link>
          <button
            className="absolute bottom-0"
            onClick={() => {
              signOut();
            }}
          >
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <BiLogOut size={20} />
            </div>
          </button>
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
