import React from "react";

function CartItems() {
  const cartItems = [
    {
      name: "LCD Monitor",
      price: "$650",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/48d27c2c-adc7-468c-910d-39b3eaa1874a?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
    },
    {
      name: "H1 Gamepad",
      price: "$550",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/bb55b5b99a91f5a7875f5f28ea35cc80370f11542a8bca7e4913d4c456a6d475?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
    },
  ];

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex overflow-hidden flex-col justify-center px-10 py-6 w-full text-base text-black whitespace-nowrap bg-white rounded shadow-sm max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
          <div className="flex-1 my-auto">Product</div>
          <div className="flex-1 my-auto">Price</div>
          <div className="flex-1 my-auto">Quantity</div>
          <div className="flex-1 my-auto">Subtotal</div>
        </div>
      </div>
      {cartItems.map((item, index) => (
        <div key={index} className="overflow-hidden py-6 pr-16 pl-8 mt-10 w-full bg-white rounded shadow-sm max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 text-base text-black max-md:mt-10">
                <img
                  loading="lazy"
                  src={item.image}
                  className="object-contain shrink-0 w-16 aspect-[1.1]"
                  alt={item.name}
                />
                <div className="my-auto">{item.name}</div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-wrap grow gap-5 justify-between items-center self-stretch my-auto text-base text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
                <div className="self-stretch my-auto">{item.price}</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/977fcf7d-c146-4afb-82bd-2846c07f8c75?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02"
                  className="object-contain shrink-0 self-stretch rounded aspect-[1.59] w-[75px]"
                  alt="Quantity selector"
                />
                <div className="self-stretch my-auto">{item.price}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6 text-base font-medium text-black max-md:max-w-full">
        <button className="gap-2.5 self-stretch px-12 py-4 rounded border border-solid border-black border-opacity-50 max-md:px-5">
          Return To Shop
        </button>
        <button className="gap-2.5 self-stretch px-12 py-4 rounded border border-solid border-black border-opacity-50 max-md:px-5">
          Update Cart
        </button>
      </div>
    </div>
  );
}

export default CartItems;
