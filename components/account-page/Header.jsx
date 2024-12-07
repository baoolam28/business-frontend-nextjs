/**
 * This code was generated by Builder.io.
 */
import React from "react";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-16 py-3 w-full text-sm bg-black text-neutral-50 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-grow items-center justify-center">
        <p className="text-center">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </p>
        <a
          href="#"
          className="ml-4 font-semibold leading-6 underline"
        >
          Shop Now
        </a>
      </div>
      <div className="flex items-center">
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;

