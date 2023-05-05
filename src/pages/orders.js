import React from "react";
import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import OrderComponent from "@/components/OrderComponent";

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const CheckoutProducts = orders.map((order, index) => {
    const [date, orderInfo] = Object.entries(order)[0];
    const { totalPrice, quantity, cart } = orderInfo;
    return (
      <OrderComponent
        key={index}
        date={date}
        totalPrice={totalPrice}
        quantity={quantity}
        cart={cart}
      />
    );
  });

  return (
    <Layout>
      <div className="pt-44">
        <main className="max-w-screen-lg mx-auto">
          <div></div>
          <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
            Your Orders
          </h1>
          <h2>{orders.length}</h2>
          <div className="mt-5 space-y-4"></div>
          {CheckoutProducts}
        </main>
      </div>
    </Layout>
  );
};

export default Orders;
