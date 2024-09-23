/**
 * This code was generated by Builder.io.
 */
import React from "react";

const categories = [
  {
    name: "Phones",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/485bbd9dc8b2471107b0babd947f82499f3c87699279e71c8e3cd50490384ec3?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "Computers",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a1d1e6089f75ae6d32325f7981defa76826f7d820959c77e8724d2c237024a6?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "SmartWatch",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/666ad723b28d4c6da1dda2887da8981482925da9f9bb7e93661c2861ee901f3f?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "Camera",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5eed44a6c1d4c8468007e12066c57cf45dc18c6e9b505269272eb85cd4f19693?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "HeadPhones",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/07f0bb299499665f42b9001f0f3a79d9695b1545a01b9f53813601ce883d9118?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "Gaming",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fae17a8752e6b7cada0ccdef68463aba8985aec91b955f1f81e0e9624a92c30a?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
];

const CategoryBrowse = () => {
  return (
    <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
        <div className="flex flex-col min-w-[240px]">
          <div className="flex gap-4 items-center self-start">
            <div className="flex flex-col self-stretch my-auto w-5">
              <div className="flex shrink-0 h-10 bg-red-500 rounded" />
            </div>
            <span className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
              Categories
            </span>
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Browse By Category
          </h2>
        </div>
        <div className="flex gap-2 items-start">
          <button aria-label="Previous" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt=""
              className="object-contain shrink-0 aspect-square w-[46px]"
            />
          </button>
          <button aria-label="Next" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt=""
              className="object-contain shrink-0 aspect-square w-[46px]"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 text-base text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
        {categories.map((category, index) => (
          <a
            key={index}
            href={`/category/${category.name.toLowerCase()}`}
            className="flex overflow-hidden flex-col items-center px-9 py-6 rounded border border-solid border-black border-opacity-30 w-[170px] max-md:px-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <img
              loading="lazy"
              src={category.icon}
              alt=""
              className="object-contain w-14 aspect-square"
            />
            <span className="mt-4">{category.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowse;