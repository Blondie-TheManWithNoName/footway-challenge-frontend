import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-y-2 pr-[7vw]">
      <h1 className="text-center text-xl font-medium uppercase mb-[18vh] mt-[20vh]">
        Footway+ Challenge
      </h1>
      <div className="max-w-48 flex flex-col gap-y-3">
        <Link
          to="/orders"
          className="text-violet-800 border-[1.5px] border-violet-800 px-4 py-1.5 w-full text-center hover:bg-violet-50 hover:text-violet-900"
        >
          Orders
        </Link>
        <Link
          to="/digital-products"
          className="text-violet-800 border-[1.5px] border-violet-800 px-4 py-1.5 w-full text-center hover:bg-violet-50 hover:text-violet-900"
        >
          Digital Products
        </Link>
        <Link
          to="/physical-products"
          className="text-violet-800 border-[1.5px] border-violet-800 px-4 py-1.5 w-full text-center hover:bg-violet-50 hover:text-violet-900"
        >
          Physical Products
        </Link>
      </div>
    </div>
  );
}
