"use client"
import React from 'react';
import SocialIcons from './SocialIcons';

function Footer() {
  const footerSections = [
    {
      title: "Support",
      items: [
        "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
        "exclusive@gmail.com",
        "+88015-88888-9999"
      ]
    },
    {
      title: "Account",
      items: ["My Account", "Login / Register", "Cart", "Wishlist", "Shop"]
    },
    {
      title: "Quick Link",
      items: ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"]
    }
  ];

  return (
    <footer className="flex flex-col justify-end pt-20 pb-6 mt-36 w-full bg-black max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap justify-between items-start max-md:max-w-full px-4"> {/* Increased padding here */}
        <div className="flex flex-col text-neutral-50 w-full max-w-[217px]">
          <h2 className="text-2xl font-bold tracking-wider leading-none">Exclusive</h2>
          <h3 className="mt-4 text-xl font-medium leading-snug">Subscribe</h3>
          <p className="mt-4 text-base">Get 10% off your first order</p>
          <form className="flex gap-2 items-center py-3 pl-4 mt-4 text-base rounded border border-neutral-50 w-full">
            <label htmlFor="email-input" className="sr-only">Enter your email</label>
            <input
              type="email"
              id="email-input"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-none text-neutral-50 opacity-40 outline-none"
            />
            <button type="submit" aria-label="Subscribe">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/12a54082781a806227ade42d81d6722495cd51ed50c28a6b5eebf5a1f9d88295?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02" className="object-contain w-6 aspect-square" alt="" />
            </button>
          </form>
        </div>

        {footerSections.map((section, index) => (
          <div key={index} className="flex flex-col text-neutral-50 w-full max-w-[200px]">
            <h3 className="text-xl font-medium leading-snug">{section.title}</h3>
            <ul className="flex flex-col mt-4 text-base">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className={itemIndex > 0 ? "mt-2" : ""}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col text-neutral-50 w-full max-w-[217px]">
          <h3 className="text-xl font-medium leading-snug">Download App</h3>
          <p className="text-xs font-medium opacity-70 mt-2">Save $3 with App New User Only</p>
          <div className="flex gap-1 items-center mt-2">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6aab00e71b970bdad60cac13646a4eae45c0005ef81fa2d4579b580931834d27?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02" className="object-contain w-20 aspect-square" alt="QR Code" />
            <div className="flex flex-col">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4db790075ffc9fa00017c27cace190780dba9226e3a27e04cec8f11ddbfb36b?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02" className="object-contain w-[110px] aspect-[2.75]" alt="Download on App Store" />
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/89fd8c9820971a1656a784adf3c50ed7d1da9779750c03dfbcff92df5a81bfcd?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02" className="object-contain w-[110px] mt-1 aspect-[2.75]" alt="Get it on Google Play" />
            </div>
          </div>
        </div>
      </div>

      <SocialIcons />

      <div className="flex flex-col items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="w-full bg-white border border-white opacity-40 min-h-[1px]" />
        <div className="flex gap-3 items-center mt-4 text-base text-white">
          <div className="flex gap-1.5 items-center my-auto min-w-[240px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9e77ca5f6362e8c84e9e430400b10a2e9fcc4f4b98d11736abbf6c72292338e?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02" className="object-contain w-5 aspect-square" alt="" />
            <p>Copyright Rimel 2022. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
