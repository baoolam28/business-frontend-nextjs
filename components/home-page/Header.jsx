
import React from "react";
import SearchBar from "./SearchBar";
import IconButton from "./IconButton";

const Header = () => {
  return (
    <header className="flex flex-col items-start self-end mt-10 w-full max-w-[1305px] max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-start self-stretch my-auto text-black min-w-[240px] max-md:max-w-full">
          <h1 className="text-2xl font-bold tracking-wider leading-none whitespace-nowrap w-[118px]">
            Exclusive
          </h1>
          <nav className="flex gap-10 items-start text-base text-center min-w-[240px]">
            <a
              href="/"
              className="flex flex-col items-center w-12 whitespace-nowrap"
            >
              <span>Home</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c4a968e61751929cf46491fa57e5fa87f2f3c7c5d51673c41475a8954433106?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
                alt=""
                className="object-contain w-12 aspect-[47.62]"
              />
            </a>
            <a href="/contact" className="whitespace-nowrap w-[66px]">
              Contact
            </a>
            <a href="/about" className="w-12 whitespace-nowrap">
              About
            </a>
            <a href="/signup" className="w-[61px]">
              Sign Up
            </a>
          </nav>
        </div>
        <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px]">
          <SearchBar />
          <div className="flex gap-4 justify-center items-center self-stretch my-auto">
            <IconButton
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/850597cc14d3bfef027aa097fc5bca3ac1b650d683dc1d3c8c0134d5cd9a061d?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt="Wishlist"
            />
            <IconButton
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/1d49936bb7e7947951a24074df0be75fc667e72893b1780ac9e82c006a87816b?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt="Cart"
            />
            <IconButton
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/5da7135e32227c2b57956f4aeebb39217ace541f01beff22a9a74f318d6ed56d?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt="Profile"
              fillColor="fill-red-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
