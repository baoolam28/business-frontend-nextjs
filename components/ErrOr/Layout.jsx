/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Header />
      <Navigation />
      <div className="mt-4 w-full bg-black border border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;