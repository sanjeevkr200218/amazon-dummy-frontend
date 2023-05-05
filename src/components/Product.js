import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { incrementCartItem } from "../store/cartSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Product = ({ id, title, price, description, category, image }) => {
  const dispatch = useDispatch();
  const [cartCheckMark, setCartCheckMark] = useState("hidden");
  const router = useRouter();
  const addToCartHandler = () => {
    setCartCheckMark("visible");
    setTimeout(() => {
      setCartCheckMark("hidden");
    }, 5000);
    dispatch(incrementCartItem(id));
  };
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  useEffect(() => {
    setIsDomLoaded(true);
  }, []);
  return (
    isDomLoaded && (
      <div className=" relative flex flex-col m-5 bg-white z-30 p-10 border-2 shadow-lg items-center">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">
          {category}
        </p>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`./product/${id}`);
          }}
        >
          <Image
            src={image}
            height={200}
            width={200}
            style={{ objectFit: "contain", height: 200, width: 200 }}
            priority
            alt="productImage"
          />
        </div>

        <h4
          onClick={() => router.push(`./product/${id}`)}
          className="my-3 cursor-pointer"
        >
          {title}
        </h4>
        <div className=" text-sm line-clamp-2 my-2">{description}</div>
        <section className="my-3 font-bold">${price}</section>

        <button
          onClick={addToCartHandler}
          className="my-3 bg-gradient-to-b from-yellow-200 to-yellow-400 hover: border-yellow-300 border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 rounded-lg"
        >
          Add to Cart
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 text-green-500 ${cartCheckMark}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    )
  );
};

export default Product;
