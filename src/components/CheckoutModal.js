import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

import { motion } from "framer-motion";

const CheckoutModal = ({ show, setShow }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
    if (show) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);
  const modalCheckout = show ? (
    <div className="h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)] z-10 absolute top-0 left-0">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="h-48 w-48 bg-white border-2 border-gray-500 shadow-lg z-20 "
      >
        <div className="flex flex-col justify-center items-center space-y-3 p-5">
          <div className="text-center font-semibold">
            Your Order Has Been Placed
          </div>
          <div className="space-x-2 flex">
            <div>Go to</div>
            <Link href="/orders" className="hover:font-bold underline">
              your orders
            </Link>
          </div>
          <button
            onClick={() => setShow(false)}
            className="bg-gradient-to-b from-yellow-200 to-yellow-400 hover: border-yellow-300 border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 rounded-lg"
          >
            Ok
          </button>
        </div>
      </motion.div>
    </div>
  ) : null;

  if (isBrowser)
    return createPortal(modalCheckout, document.getElementById("modal-root"));
  else return null;
};

export default CheckoutModal;
