import React from "react";

function Header() {
  return (
    <header className="bg-black text-neutral-50">
      <div className="flex overflow-hidden flex-col justify-center items-end px-16 py-3 w-full text-sm bg-black max-md:px-5">
        <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
          <div className="flex flex-wrap gap-2 items-center min-w-[240px] max-md:max-w-full">
            <div className="self-stretch my-auto w-[474px] max-md:max-w-full">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </div>
            <a href="#" className="self-stretch my-auto font-semibold leading-6 text-center underline">
              ShopNow
            </a>
          </div>
          <div className="flex gap-1.5 justify-center items-center whitespace-nowrap">
            <div className="self-stretch my-auto">English</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c458026ddcb4daaaca9291897ab1b8ab8e65bd1233e48db8bbc95eb90ee3e16?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Centered Navigation Menu */}
      <nav className="flex justify-center items-center mt-10 max-md:max-w-full">
        <div className="flex gap-10 items-center text-black text-base text-center">
          <div className="text-2xl font-bold tracking-wider leading-none whitespace-nowrap">
            Exclusive
          </div>
          <a href="#" className="whitespace-nowrap">
            Home
          </a>
          <div className="flex flex-col items-center whitespace-nowrap">
            <a href="#">Contact</a>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0947c4aeb13f405d8dda20a1ebf8472d3cc3dea21c4822f06f45bf7693a93e8c?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
              className="object-contain aspect-[66.67] w-[66px]"
              alt=""
            />
          </div>
          <a href="#" className="whitespace-nowrap">
            About
          </a>
          <a href="#" className="whitespace-nowrap">
            Sign Up
          </a>
        </div>
        <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px]">
          <form className="flex justify-center items-center py-2 pr-3 pl-5 text-xs text-black rounded bg-neutral-100">
            <div className="flex gap-9 items-center">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                id="search"
                type="text"
                className="bg-transparent border-none opacity-50"
                placeholder="What are you looking for?"
              />
              <button type="submit">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a36546edd30f9649053810fdbf6c98d92541e863e7b8b10ab13af855343b34e?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
                  className="object-contain w-6 aspect-square"
                  alt="Search"
                />
              </button>
            </div>
          </form>
          <div className="flex gap-4 justify-center items-center">
            <button aria-label="Wishlist">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/850597cc14d3bfef027aa097fc5bca3ac1b650d683dc1d3c8c0134d5cd9a061d?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
                className="object-contain w-8 aspect-square"
                alt=""
              />
            </button>
            <button aria-label="Cart">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1602ef0e88675df931f73ee88ccd85c7a919ff3264f5e5c09b7ad94b1f6df9c?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
                className="object-contain w-8 aspect-square"
                alt=""
              />
            </button>
            <button aria-label="User profile">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/505a01368e57ac667ecd551fd161eb3fa8202cee72841e5b11d9f712055e4607?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
                className="object-contain w-8 aspect-square"
                alt=""
              />
            </button>
          </div>
        </div>
      </nav>
      <div className="shrink-0 mt-4 w-full h-px bg-black border border-black opacity-30" />
    </header>
  );
}

export default Header;
