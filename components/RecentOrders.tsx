import React from "react";
import { data } from "@/data/data";
import { IoFastFoodOutline } from "react-icons/io5";

const RecentOrders = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-scroll">
      <h1>Recent Orders</h1>
      <ul>
        {data.map((order, id) => (
          <li
            key={id}
            className="bg-gray-100 hover:bg-gray-200 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-purple-100 p-3 rounded-lg">
              <IoFastFoodOutline className="text-purple-800" />
            </div>
            <div className="pl-4">
              <p className="font-bold">{order.name.last}</p>
              <p className="italic text-sm">{order.total.toFixed(2)} €</p>
            </div>
            <p className="text-gray-400 lg:flex md:hidden absolute right-6 text-sm">
              #{order.id}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;