import React from "react";

function IconButton({ src }) {
  return (
    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      <img
        loading="lazy"
        src={src}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
      />
    </button>
  );
}

export default IconButton;