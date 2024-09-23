/**
 * This code was generated by Builder.io.
 */
import React from "react";
import LanguageSelector from "./LanguageSelector";

function Header() {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-center px-16 py-3 w-full text-sm bg-black text-neutral-50 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
        <div className="flex flex-wrap gap-2 items-center min-w-[240px] max-md:max-w-full">
          <p className="self-stretch my-auto w-[474px] max-md:max-w-full">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <a
            href="#"
            className="self-stretch my-auto font-semibold leading-6 text-center underline"
          >
            ShopNow
          </a>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
}

export default Header;
