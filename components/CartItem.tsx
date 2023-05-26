"use client";

import Image from "next/image";
import React from "react";
import { XIcon } from "./Icons";

function CartItem() {
  return (
    <div className="justify-between rounded-lg bg-white my-4 sm:flex sm:justify-start">
      <Image
        src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
        width={200}
        height={40}
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between ">
        <div className="mt-5 sm:mt-0 space-y-2">
          <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
          <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
          <div className="flex items-center text-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              -{" "}
            </span>
            <input
              className="h-8 w-8 borderbg-white text-center text-xs outline-none"
              type="number"
              placeholder="2"
              // value="2"
              min="1"
            />
            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              +{" "}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">259.000 ₭</p>
            <XIcon />
          </div>
        </div>
        {/* <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div> */}
      </div>
    </div>
  );
}

export default CartItem;
