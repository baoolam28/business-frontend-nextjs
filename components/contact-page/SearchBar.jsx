import React from "react";

function SearchBar() {
  return (
    <form className="flex flex-col justify-center items-center self-stretch py-2 pr-3 pl-5 my-auto text-xs text-black rounded bg-neutral-100 min-w-[240px]">
      <div className="flex gap-9 justify-center items-center">
        <label htmlFor="search" className="sr-only">
          What are you looking for?
        </label>
        <input
          type="search"
          id="search"
          placeholder="What are you looking for?"
          className="self-stretch my-auto opacity-50 bg-transparent outline-none"
        />
        <button type="submit" aria-label="Search">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a36546edd30f9649053810fdbf6c98d92541e863e7b8b10ab13af855343b34e?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;