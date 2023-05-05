import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import HamMenu from "./HamMenu";

const Header = () => {
  const router = useRouter();
  const cartState = useSelector((store) => store.cart.cart);

  let cartQuantity = 0;
  for (let key in cartState) {
    cartQuantity += cartState[key];
  }
  const [showMenu, setShowMenu] = useState(false);
  const openHamMenu = function () {
    setShowMenu(!showMenu);
  };
  return (
    <header className="">
      {/* Top nav */}
      <div className="flex items-center justify-between bg-amazon_blue p-1 py-2s px-5">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="mt-2 flex items-center"
        >
          <Image
            src="https://links.papareact.com/f90"
            alt="logo"
            width={100}
            height={40}
            style={{ objectFit: "contain", height: "auto", width: "auto" }}
            priority
            className="cursor-pointer md:h-16 md:w-32"
          />
        </div>
        {/* Delivery */}
        <div className="cursor-pointer items-center hidden sm:flex mx-5">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <p className="text-white">:</p>
            <p className="text-white ml-2"> Address</p>
          </div>
        </div>
        {/* Searchbar */}
        <div className=" flex items-center cursor-pointer flex-grow mx-3">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-l-md outline-none h-9 px-2 w-full"
          />
          <div className=" h-9 w-10 flex items-center justify-center rounded-r-md bg-amber-500 hover:bg-amber-600">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
        {/* Cart */}
        <div
          onClick={() => router.push("/cart")}
          className=" mx-5 relative mr-5 cursor-pointer"
        >
          <svg
            className="w-10 h-10 text-white relative"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="text-white text-sm font bg-amber-600 rounded-full w-5 h-5 flex items-center justify-center absolute top-1 left-6">
            {cartQuantity}
          </div>
        </div>
        {/* User Options */}
        <div className=" mx-5 text-white justify-between items-center text-xs space-x-6 hidden sm:flex">
          <div className="link">
            <p>Hello User,</p>
            <p className="font-bold">Your Account</p>
          </div>
          <div
            onClick={() => {
              router.push("/orders");
            }}
            className="link"
          >
            <p>Your</p>
            <p className="font-bold">Orders</p>
          </div>
        </div>
        {/* Hamburger Menu */}
        <div onClick={openHamMenu} className="sm:hidden cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <HamMenu show={showMenu} setShow={setShowMenu} />
      </div>

      {/* Bottom nav */}
      <div className="flex bg-amazon_blue-light space-x-5 text-white p-2 text-center text-xs sm:text-base relative">
        <div className="flex items-center text-center"></div>
        <div className="link">All</div>
        <div className="link">Today&apos;s Deals</div>
        <div className="link">Customer Service</div>
      </div>
    </header>
  );
};

export default Header;
