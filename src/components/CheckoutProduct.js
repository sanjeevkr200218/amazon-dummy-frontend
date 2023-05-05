import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
} from "@/store/cartSlice";

const CheckoutProduct = ({ id }) => {
  const itemQuantity = useSelector((store) => store.cart.cart[id]);
  const [isDecrementDisabled, setIsDecrementDisabled] = useState(false);
  const [productData, setProductData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (itemQuantity === 1) {
      setIsDecrementDisabled(true);
    } else if (itemQuantity > 1) {
      setIsDecrementDisabled(false);
    }
  }, [itemQuantity]);

  const fetchData = useCallback(async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const json = await response.json();
    setProductData(json);
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const incrementHandler = () => {
    dispatch(incrementCartItem(id));
  };
  const decrementHandler = () => {
    dispatch(decrementCartItem(id));
  };
  const deleteHandler = () => {
    dispatch(removeCartItem(id));
  };

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <div className="grid grid-cols-5 bg-white border-2 shadow-lg p-6">
      <div>
        <Image
          src={productData.image}
          height={150}
          width={150}
          alt="cartImage"
          style={{
            objectFit: "contain",
            height: 170,
            width: 170,
            padding: "5px",
          }}
        />
      </div>

      {/* Middle */}
      <div className="col-span-3 mx-5 flex flex-col space-y-5">
        <p className="font-bold">{productData.title}</p>
        <p className="text-xs my-2 line-clamp-3">{productData.description}</p>
        <div className="space-x-2 flex">
          <div>${productData.price}</div> <div>*</div> <div>{itemQuantity}</div>{" "}
          <div>=</div>
          <div className="font-bold">${itemQuantity * productData.price}</div>
        </div>
        <div className="flex space-x-3 items-center">
          <button
            onClick={decrementHandler}
            disabled={isDecrementDisabled}
            className="bg-white hover:bg-gray-600 border-2 font-bold border-black w-5 h-5 flex justify-center items-center hover:text-white disabled:cursor-not-allowed disabled:text-slate-300"
          >
            -
          </button>
          <div>{itemQuantity}</div>
          <button
            onClick={incrementHandler}
            className="bg-white hover:bg-gray-600 border-2 font-bold border-black w-5 h-5 flex justify-center items-center hover:text-white"
          >
            +
          </button>
          <button
            onClick={deleteHandler}
            className=" text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-3 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* End */}
    </div>
  );
};

export default CheckoutProduct;
