/**
 * This code was generated by Builder.io.
 */
import React from "react";

function Sidebar() {
  const sidebarItems = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ca476ed9788b0635fa382610b2e3d89620924a82b60829f64c1f0409a88f8c6?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
      alt: "Dashboard icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8698e00d26f2b37c6ffe604003ab73724452307d6f3066c6773e5d3bd92811a6?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
      alt: "Analytics icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5925914b9e513558d59a79994c05f8a1147bfd1d653d3023c5b7af2d4f5825e0?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
      alt: "Messages icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/121edd31a6e17010b3b41274122e08d69786254d6b38c2e1fe53d9b11fcd743e?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
      alt: "Calendar icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9a4eff732a0e1d821878d8656169987bd4e6468b17c9bcd8136d4f9e186fc0ce?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
      alt: "Settings icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cc4f543c6646708b47460b3382a5c0ed07285f79f657ed443c27571d4a5ebbcb?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
      alt: "Profile icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/39316068f1e1220d4c8b32b24644d10dd6afb9db150f4b76440f348807adc4f8?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba",
      alt: "Help icon",
    },
  ];

  return (
    <aside className="flex overflow-hidden flex-col px-3.5 pt-2.5 pb-5 bg-white max-md:hidden">
      {sidebarItems.map((item, index) => (
        <img
          key={index}
          loading="lazy"
          src={item.src}
          alt={item.alt}
          className={`object-contain rounded-none aspect-square w-[70px] ${
            index > 0 ? "mt-9" : ""
          } ${
            index === sidebarItems.length - 1
              ? "self-center w-10 mt-[901px] max-md:mt-10"
              : "max-md:mr-0.5"
          }`}
        />
      ))}
    </aside>
  );
}

export default Sidebar;
