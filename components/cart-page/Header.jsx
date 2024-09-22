import React from "react";
import LanguageSelector from "./LanguageSelector";
import SearchBar from "./SearchBar";
import IconGroup from "./IconGroup";

function Header() {
  return (
    <header className="flex flex-col bg-white">
      <div className="flex justify-between items-center px-16 py-3 w-full text-sm bg-black text-neutral-50 max-md:px-5">
        <div className="flex justify-center items-center w-full">
          <span className="text-neutral-50 font-medium text-center mx-auto">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! &nbsp;
            <a href="#" className="font-semibold underline text-neutral-50">
              Shop Now
            </a>
          </span>
        </div>
        <div className="ml-auto">
          <LanguageSelector />
        </div>
      </div>
      <nav className="flex justify-between items-center mt-10 px-16 max-md:px-5">
        <div className="flex items-center text-black">
          <h1 className="text-2xl font-bold tracking-wider leading-none whitespace-nowrap">
            Exclusive
          </h1>
          <div className="flex gap-8 items-center text-base ml-10">
            <a href="#" className="whitespace-nowrap">Home</a>
            <a href="#" className="whitespace-nowrap">Contact</a>
            <a href="#" className="whitespace-nowrap">About</a>
            <a href="#" className="whitespace-nowrap">Sign Up</a>
          </div>
        </div>
        <div className="flex items-center">
          <SearchBar />
          <IconGroup />
        </div>
      </nav>
    </header>
  );
}

export default Header;
