"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { BsFillCheckCircleFill, BsEyeFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { dd_orders } from "@/data/data";
import Modal from "@/components/Modal";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewModalData, setViewModalData] = useState({} as any);

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin");
    },
  });

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header title="Orders" username={(session.data?.user as any) ?? ""} />
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span className="font-bold">Order</span>
            <span className="sm:text-left text-right font-bold">Customer</span>
            <span className="hidden md:grid font-bold">Status</span>
            <span className="hidden sm:grid justify-self-center max-md:justify-self-end font-bold">
              Actions
            </span>
          </div>
          <ul>
            {dd_orders.map((order, id) => (
              <li
                key={id}
                className="bg-gray-100 hover:bg-gray-200 my-3 p-2 rounded-lg grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <p className="pl-4 font-bold text-gray-700">
                    {order.total.toFixed(2)} €
                  </p>
                </div>
                <p className="sm:text-left text-right">
                  {order.name.last} {order.name.first}
                </p>
                <p className="hidden md:grid">
                  <span
                    className={
                      (order.status === "Completed"
                        ? "bg-green-200 text-green-600"
                        : "bg-blue-200 text-blue-600") +
                      " rounded-lg px-[0.5rem] py-1 w-min"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <div className="hidden sm:flex justify-self-center max-md:justify-self-end">
                  <div className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg mx-1 flex items-center">
                    <BsFillCheckCircleFill />
                    <p className="pl-2">Mark as Completed</p>
                  </div>
                  <button
                    className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg mx-1 flex items-center"
                    onClick={() => {
                      setViewModalData(order);
                      setShowViewModal(true);
                    }}
                  >
                    <BsEyeFill />
                    <p className="pl-2">View</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal
        title="View order"
        isVisible={showViewModal}
        onClose={() => setShowViewModal(false)}
        className="w-[20rem]"
      >
        <div className="my-2">
          <div className="border border-gray-500 p-2">
            {viewModalData["items"]
              ? viewModalData["items"].map((item: any[], id: number) => (
                  <p key={id}>
                    - {item[1]} x{item[2]}
                  </p>
                ))
              : null}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg"
            onClick={() => {
              setShowViewModal(false);
            }}
          >
            Back
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default Page;
