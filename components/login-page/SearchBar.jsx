/**
 * This code was generated by Builder.io.
 */
import React from "react";

function SearchBar() {
  return (
    <div className="flex gap-6 items-center self-stretch my-auto text-xs min-w-[240px]">
      <form className="flex flex-col justify-center items-center self-stretch py-2 pr-3 pl-5 my-auto rounded bg-neutral-100 min-w-[240px]">
        <div className="flex gap-9 justify-center items-center">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="What are you looking for?"
            className="self-stretch my-auto opacity-50 bg-transparent border-none outline-none"
          />
          <button type="submit" aria-label="Search">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a36546edd30f9649053810fdbf6c98d92541e863e7b8b10ab13af855343b34e?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              alt=""
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
