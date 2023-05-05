import React, { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import CheckoutProduct from "@/components/CheckoutProduct";
import CheckoutModal from "../components/CheckoutModal";
import { makeOrder } from "@/store/ordersSlice";
import { clearCart } from "@/store/cartSlice";

const Cart = () => {
  const [products, setProducts] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.cart);
  const orders = useSelector((store) => store.orders);
  let totalItems = 0;
  const current = new Date();
  const date = current.toDateString();
  const uniqueItemCount = Object.keys(cart).filter(
    (item) => cart[item] > 0
  ).length;

  const checkoutHandler = () => {
    setShowCheckoutModal(true);
    dispatch(
      makeOrder({
        date: date,
        cart: cart,
        quantity: uniqueItemCount,
        totalPrice: totalPrice,
      })
    );
    dispatch(clearCart());
  };
  for (let quantity of Object.values(cart)) {
    totalItems += quantity;
  }
  useEffect(() => {
    async function fetchData() {
      const productsResponse = await fetch("https://fakestoreapi.com/products");
      const productsData = await productsResponse.json();
      setProducts(productsData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    function calculateTotalPrice() {
      if (!products) {
        return 0;
      }
      let newTotalPrice = 0;

      for (const [id, quantity] of Object.entries(cart)) {
        const product = products.find((p) => p.id.toString() === id.toString());

        if (product) {
          const itemPrice = +product.price * +quantity;
          newTotalPrice += itemPrice;
        }
      }

      return newTotalPrice;
    }
    setTotalPrice(calculateTotalPrice());
  }, [cart, products]);

  if (totalItems === 0) {
    return (
      <Layout>
        <main className="lg:flex-row flex-row max-w-screen-2xl mx-auto pt-32">
          {/* Left */}
          <div className="bg-white max-w-screen-lg">
            <div className=" max-w-screen-lg flex justify-center">
              <Image
                src={"https://links.papareact.com/ikj"}
                width={1020}
                height={250}
                alt="checkout banner"
                priority
                style={{ objectFit: "contain", height: "auto", width: "auto" }}
              />
            </div>

            <div className="flex flex-col p-5 space-y-10 bg-white ">
              <h1 className="text-3xl border-b-2 pb-4">
                Your Shopping Basket is empty
              </h1>
            </div>
            <CheckoutModal
              show={showCheckoutModal}
              setShow={setShowCheckoutModal}
            />
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="lg:flex-row lg:flex flex lg:justify-between lg:space-x-5 lg:space-y-0 space-y-5 flex-col max-w-screen-2xl mx-auto pt-32">
        {/* Left */}
        <div className="bg-white max-w-screen-lg">
          <div className=" max-w-screen-lg flex justify-center shadow-lg">
            <Image
              src={"https://links.papareact.com/ikj"}
              width={1020}
              height={250}
              alt="checkout banner"
              priority
              style={{ objectFit: "contain", height: "auto", width: "auto" }}
            />
          </div>

          <div className="flex flex-col p-5 space-y-10 bg-white shadow-lg">
            <h1 className="text-3xl border-b-2 pb-4">Shopping Basket</h1>
          </div>
          <div className="max-w-screen-lg shadow-lg">
            {Object.keys(cart).map((item) => (
              <CheckoutProduct key={item} id={item} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="bg-white flex-grow flex flex-col justify-center items-center h-32 shadow-lg">
          <div className="space-x-2 flex ">
            <div>Total Price:</div>
            <div className="font-bold">${totalPrice}</div>
          </div>
          <button
            onClick={checkoutHandler}
            className="my-3 bg-gradient-to-b from-yellow-200 to-yellow-400 hover: border-yellow-300 border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 rounded-lg"
          >
            Checkout
          </button>
        </div>
        <CheckoutModal
          show={showCheckoutModal}
          setShow={setShowCheckoutModal}
        />
      </main>
    </Layout>
  );
};

export default Cart;
