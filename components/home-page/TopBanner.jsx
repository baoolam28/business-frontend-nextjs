/**
 * This code was generated by Builder.io.
 */
import React from "react";

const TopBanner = () => {
  return (
    <div className="flex overflow-hidden flex-col justify-center items-center px-16 py-3 w-full text-sm bg-black text-neutral-50 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
        <div className="flex flex-wrap gap-2 items-center min-w-[240px] max-md:max-w-full">
          <p className="self-stretch my-auto w-[474px] max-md:max-w-full">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <a
            href="/shop"
            className="self-stretch my-auto font-semibold leading-6 text-center underline"
          >
            ShopNow
          </a>
        </div>
        <div className="flex gap-1.5 justify-center items-center whitespace-nowrap">
          <span className="self-stretch my-auto">English</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c458026ddcb4daaaca9291897ab1b8ab8e65bd1233e48db8bbc95eb90ee3e16?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;