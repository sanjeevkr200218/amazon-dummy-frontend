import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-screen relative min-h-screen bg-gray-200">
      <div className="fixed top-0 left-0 w-screen z-50">
        <Header />
      </div>
      <div>{children}</div>
      <div className="pt-10">
        <div className="absolute bottom-0  left-0 w-full ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
