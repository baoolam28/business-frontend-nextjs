/**
 * This code was generated by Builder.io.
 */
import React from "react";

const NewsletterForm = () => {
  return (
    <div className="flex flex-col text-neutral-50 w-[217px]">
      <div className="flex flex-col self-start">
        <div className="flex flex-col max-w-full whitespace-nowrap w-[118px]">
          <div className="w-full text-2xl font-bold tracking-wider leading-none">
            Exclusive
          </div>
          <div className="mt-6 text-xl font-medium leading-snug">Subscribe</div>
        </div>
        <div className="mt-6 text-base">Get 10% off your first order</div>
      </div>
      <form className="flex gap-8 items-center py-3 pl-4 mt-4 max-w-full text-base rounded border-solid border-[1.5px] border-neutral-50 w-[217px]">
        <label htmlFor="emailInput" className="sr-only">
          Enter your email
        </label>
        <input
          type="email"
          id="emailInput"
          placeholder="Enter your email"
          className="self-stretch my-auto bg-transparent border-none outline-none opacity-40"
        />
        <button type="submit" aria-label="Subscribe">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bac8a3a4556d00df359345f40c4304fa01a92d9d278e1cc8be218cdcd6e20d8?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
