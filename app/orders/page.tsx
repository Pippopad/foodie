import React from "react";
import Header from "@/components/Header";
import { BsFillCheckCircleFill, BsEyeFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { data } from "@/data/data";

const Orders = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header title="Orders" />
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Customer</span>
            <span className="hidden md:grid">Status</span>
            <span className="hidden sm:grid max-md:justify-self-end">
              Actions
            </span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className="bg-gray-100 hover:bg-gray-200 my-3 p-2 rounded-lg grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4 font-bold text-gray-700 self-center">
                    {order.total.toFixed(2)} €
                  </div>
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
                <div className="hidden sm:flex max-md:justify-self-end">
                  <div className="bg-purple-100 hover:bg-purple-200 w-min p-2 rounded-lg mx-1">
                    <BsFillCheckCircleFill />
                  </div>
                  <div className="bg-purple-100 hover:bg-purple-200 w-min p-2 rounded-lg mx-1">
                    <BsEyeFill />
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

export default Orders;
