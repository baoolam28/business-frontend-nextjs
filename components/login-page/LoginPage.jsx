/**
 * This code was generated by Builder.io.
 */
"use client"
import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import MainContent from "./MainContent";
import Footer from "./Footer";

function LoginPage() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Header />
      <Navigation />
      <div className="mt-4 w-full bg-black border border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />
      <MainContent />
      <Footer />
    </div>
  );
}

export default LoginPage;