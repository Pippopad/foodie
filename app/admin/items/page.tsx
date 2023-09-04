"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { FaPlus } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { BiEuro } from "react-icons/bi";

import { dd_items } from "@/data/data";
import Modal from "@/components/Modal";

const Page = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [editItemModalData, setEditItemModalData] = useState({} as any);

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header title="Items" />
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 flex justify-end">
            <button
              className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-lg flex items-center"
              onClick={() => setShowAddItemModal(true)}
            >
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
                  <div
                    className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg mx-1 flex items-center"
                    onClick={() => {
                      setEditItemModalData(item);
                      setShowEditItemModal(true);
                    }}
                  >
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
      <Modal
        title="Add new item"
        isVisible={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        className="w-[20rem]"
      >
        <div>
          <div className="my-2">
            <p className="font-bold text-lg">Name</p>
            <input
              type="text"
              className="border border-gray-500 rounded-lg p-2 w-full focus:outline-none"
            />
          </div>
          <div className="my-2 grid grid-cols-2 gap-2">
            <div>
              <p className="font-bold text-lg">Price</p>
              <div className="border border-gray-500 flex items-center rounded-lg">
                <input
                  type="number"
                  className="rounded-lg p-2 pr-1 w-full focus:outline-none"
                  defaultValue={1.0}
                  min={0.1}
                  step={0.05}
                />
                <BiEuro size={30} />
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">Amount</p>
              <input
                type="number"
                className="border border-gray-500 rounded-lg p-2 w-full focus:outline-none"
                defaultValue={1}
                min={1}
                step={1}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg"
            onClick={() => {
              setShowAddItemModal(false);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-purple-100 hover:bg-purple-200 py-2 px-4 rounded-lg"
            onClick={() => {
              setShowAddItemModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        title="Edit item"
        isVisible={showEditItemModal}
        onClose={() => setShowEditItemModal(false)}
        className="w-[20rem]"
      >
        <div className="my-2">
          <div className="my-2">
            <p className="font-bold text-lg">Name</p>
            <input
              type="text"
              className="border border-gray-500 rounded-lg p-2 w-full focus:outline-none"
              defaultValue={editItemModalData["name"]}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-bold text-lg">Price</p>
              <div className="border border-gray-500 flex items-center rounded-lg">
                <input
                  type="number"
                  className="rounded-lg p-2 pr-1 w-full focus:outline-none"
                  defaultValue={editItemModalData["price"]?.toFixed(2)}
                  min={0.1}
                  step={0.05}
                />
                <BiEuro size={30} />
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">Amount</p>
              <input
                type="number"
                className="border border-gray-500 rounded-lg p-2 w-full focus:outline-none"
                defaultValue={editItemModalData["amount"]}
                min={1}
                step={1}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg"
            onClick={() => {
              setShowEditItemModal(false);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-purple-100 hover:bg-purple-200 py-2 px-4 rounded-lg"
            onClick={() => {
              setShowEditItemModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default Page;
