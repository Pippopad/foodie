"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { FaPlus } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { BiEuro } from "react-icons/bi";

import Modal from "@/components/Modal";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { makeApiRequest } from "@/utils";

const Page = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(1.0);
  const [itemAmount, setItemAmount] = useState(1);

  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [editItemModalData, setEditItemModalData] = useState({} as any);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const session = useSession();
  if (
    session.status === "unauthenticated" ||
    session.data?.user.role !== "admin"
  ) {
    redirect("/admin");
  }

  useEffect(() => {
    async function getItems() {
      const res = await makeApiRequest("/items", "GET");
      setItems(res.data);
      setLoading(false);
    }

    getItems();
  }, [loading]);

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header
        title="Items"
        username={(session.data?.user.username as any) ?? ""}
      />
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
            {loading ? (
              <p className="text-center text-lg">Loading...</p>
            ) : items === undefined || items.length === 0 ? (
              <>
                <p className="text-center text-lg">List empty.</p>
                <div
                  className="flex justify-center items-center hover:underline cursor-pointer"
                  onClick={() => setShowAddItemModal(true)}
                >
                  <FaPlus size={20} />
                  <p className="text-center text-lg ml-1">
                    Click here to add new item
                  </p>
                </div>
              </>
            ) : (
              items.map(
                (
                  item: {
                    id: number;
                    name: string;
                    price: string;
                    amount: number;
                  },
                  id
                ) => (
                  <li
                    key={id}
                    className="bg-gray-100 hover:bg-gray-200 my-3 p-2 rounded-lg grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <IoFastFood className="text-purple-800" />
                      </div>
                      <p className="pl-4 font-bold text-gray-700">
                        {item.name}
                      </p>
                    </div>
                    <p className="hidden md:grid">
                      {Number(item.price).toFixed(2)} €
                    </p>
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
                      <button
                        className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg mx-1 flex items-center"
                        onClick={async () => {
                          await makeApiRequest(`/items/${item.id}`, "DELETE");
                          setLoading(true);
                        }}
                      >
                        <GrFormClose size={20} />
                        <p>Remove</p>
                      </button>
                    </div>
                  </li>
                )
              )
            )}
          </ul>
        </div>
      </div>
      <Modal
        title="Add new item"
        isVisible={showAddItemModal}
        onClose={() => {
          setItemName("");
          setItemPrice(1.0);
          setItemAmount(1);
          setShowAddItemModal(false);
        }}
        className="w-[20rem]"
      >
        <div>
          <div className="my-2">
            <p className="font-bold text-lg">Name</p>
            <input
              type="text"
              className="border border-gray-500 rounded-lg p-2 w-full focus:outline-none"
              defaultValue={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
          </div>
          <div className="my-2 grid grid-cols-2 gap-2">
            <div>
              <p className="font-bold text-lg">Price</p>
              <div className="border border-gray-500 flex items-center rounded-lg">
                <input
                  type="number"
                  className="rounded-lg p-2 pr-1 w-full focus:outline-none"
                  defaultValue={itemPrice}
                  onChange={(e) => {
                    setItemPrice(Number(e.target.value));
                  }}
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
                defaultValue={itemAmount}
                onChange={(e) => {
                  setItemAmount(Number(e.target.value));
                }}
                min={1}
                step={1}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg"
            onClick={async () => {
              await makeApiRequest("/items", "POST", {
                name: itemName,
                price: itemPrice,
                amount: itemAmount,
              });
              setItemName("");
              setItemPrice(1.0);
              setItemAmount(1);
              setLoading(true);
              setShowAddItemModal(false);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-purple-100 hover:bg-purple-200 py-2 px-4 rounded-lg"
            onClick={() => {
              setItemName("");
              setItemPrice(1.0);
              setItemAmount(1);
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
        onClose={() => {
          setItemName("");
          setItemPrice(1.0);
          setItemAmount(1);
          setShowEditItemModal(false);
        }}
        className="w-[20rem]"
      >
        <div className="my-2">
          <div className="my-2">
            <p className="font-bold text-lg">Name</p>
            <input
              type="text"
              className="border border-gray-500 rounded-lg p-2 w-full focus:outline-none"
              defaultValue={editItemModalData["name"]}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-bold text-lg">Price</p>
              <div className="border border-gray-500 flex items-center rounded-lg">
                <input
                  type="number"
                  className="rounded-lg p-2 pr-1 w-full focus:outline-none"
                  defaultValue={Number(editItemModalData["price"])?.toFixed(2)}
                  onChange={(e) => {
                    setItemPrice(Number(e.target.value));
                  }}
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
                onChange={(e) => {
                  setItemAmount(Number(e.target.value));
                }}
                min={1}
                step={1}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg"
            onClick={async () => {
              await makeApiRequest(`/items/${editItemModalData["id"]}`, "PUT", {
                name: itemName,
                price: itemPrice,
                amount: itemAmount,
              });
              setItemName("");
              setItemPrice(1.0);
              setItemAmount(1);
              setLoading(true);
              setShowEditItemModal(false);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-purple-100 hover:bg-purple-200 py-2 px-4 rounded-lg"
            onClick={() => {
              setItemName("");
              setItemPrice(1.0);
              setItemAmount(1);
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
