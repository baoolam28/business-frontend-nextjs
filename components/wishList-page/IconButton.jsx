/**
 * This code was generated by Builder.io.
 */
import React from "react";

function IconButton({ src, alt }) {
  return (
    <button className="focus:outline-none" aria-label={alt}>
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