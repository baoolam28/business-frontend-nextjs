import React from "react";
import NavItem from "./NavItem";
import SearchBar from "./SearchBar";
import IconButton from "./IconButton";

const navItems = [
  { text: "Home", link: "#" },
  { text: "Contact", link: "#", hasUnderline: true },
  { text: "About", link: "#" },
  { text: "Sign Up", link: "#" }
];

const iconSrcs = [
  "https://cdn.builder.io/api/v1/image/assets/TEMP/850597cc14d3bfef027aa097fc5bca3ac1b650d683dc1d3c8c0134d5cd9a061d?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/f1602ef0e88675df931f73ee88ccd85c7a919ff3264f5e5c09b7ad94b1f6df9c?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/505a01368e57ac667ecd551fd161eb3fa8202cee72841e5b11d9f712055e4607?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba"
];

function ExclusiveHeader() {
  return (
    <header className="flex flex-wrap gap-10 items-center self-center mt-10 max-md:max-w-full">
      <nav className="flex flex-wrap gap-10 items-start self-stretch my-auto text-black min-w-[240px] max-md:max-w-full">
        <h1 className="text-2xl font-bold tracking-wider leading-none whitespace-nowrap w-[118px]">
          Exclusive
        </h1>
        <ul className="flex gap-10 items-start text-base text-center min-w-[240px]">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </ul>
      </nav>
      <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px]">
        <SearchBar />
        <div className="flex gap-4 justify-center items-center self-stretch my-auto">
          {iconSrcs.map((src, index) => (
            <IconButton key={index} src={src} />
          ))}
        </div>
      </div>
    </header>
  );
}

export default ExclusiveHeader;