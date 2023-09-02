import React from "react";
import Header from "@/components/Header";
import { FaPlus } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";

import { dd_items } from "@/data/data";

const Items = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header title="Items" />
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 flex justify-end">
            <button className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center">
              <FaPlus />
              <p className="pl-1">Add</p>
            </button>
          </div>
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span className="font-bold">Item</span>
            <span className="hidden md:grid font-bold">Price</span>
            <span className="sm:text-left text-right font-bold">Amount</span>
            <span className="hidden sm:grid justify-self-center max-md:justify-self-end font-bold">
              Actions
            </span>
          </div>
          <ul>
            {dd_items.map((item, id) => (
              <li
                key={id}
                className="bg-gray-100 hover:bg-gray-200 my-3 p-2 rounded-lg grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <IoFastFood className="text-purple-800" />
                  </div>
                  <p className="pl-4 font-bold text-gray-700">{item.name}</p>
                </div>
                <p className="hidden md:grid">{item.price.toFixed(2)} €</p>
                <p className="sm:text-left text-right">{item.amount}</p>
                <div className="hidden sm:flex justify-self-center max-md:justify-self-end">
                  <div className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg mx-1 flex items-center">
                    <BiSolidEdit />
                    <p className="pl-2">Edit</p>
                  </div>
                  <div className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg mx-1 flex items-center">
                    <GrFormClose size={20} />
                    <p>Remove</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Items;
