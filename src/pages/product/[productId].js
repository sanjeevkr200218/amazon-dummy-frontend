import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useDispatch } from "react-redux";

import Zoom from "react-img-hover-zoom";
import { incrementCartItem } from "@/store/cartSlice";

const ProductPage = ({ productData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = +router.query.productId;
  const [cartCheckMark, setCartCheckMark] = useState("hidden");
  const addToCartHandler = () => {
    setCartCheckMark("visible");
    setTimeout(() => {
      setCartCheckMark("hidden");
    }, 5000);
    dispatch(incrementCartItem(id));
  };
  return (
    <Layout>
      <div className="max-w-screen-2xl  mx-auto pt-60 flex justify-center items-center">
        <div className="flex md:flex-row flex-col p-10 bg-white shadow-lg items-center">
          <div>
            <Zoom
              height={500}
              zoomScale={3}
              width={500}
              style={{ height: "auto", width: "auto" }}
              img={`${productData.image}`}
              alt=""
            />
          </div>
          <div className="relative ml-10 max-w-lg grid-cols-1 space-y-5 text-sm md:text-lg ">
            <div className="font-bold border-b-black border-b-2">
              {productData.title}
            </div>

            <div className="flex space-x-3">
              <p className="font-bold">Category:</p>
              <div>{productData.category}</div>
            </div>
            <div className="flex space-x-3">
              <p className="font-bold">Description:</p>
              <p> {productData.description}</p>
            </div>
            <div className="flex space-x-3">
              <p className="font-bold">Price:</p>
              <p>{`$${productData.price}`}</p>
            </div>
            <div>
              <div className="flex items-center space-x-3">
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;

export async function getServerSideProps(context) {
  const pathName = context.params.productId;
  const productData = await fetch(
    `https://fakestoreapi.com/products/${pathName}`
  ).then((res) => res.json());

  if (!productData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      productData,
    },
  };
}
