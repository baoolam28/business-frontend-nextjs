/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Header from "../../components/component/Header";
import AccountNavigation from "./AccountNavigation";
import ProfileForm from "./ProfileForm";
import Footer from "./Footer";

const AccountPage = () => {
  return (
    <div className="flex flex-col bg-white">
      <Header />

      <div className="" />
      <div className="flex flex-wrap gap-10 self-center mt-20 w-full text-sm max-w-[1170px] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-1 gap-3 items-center text-black">
          <a href="#" className="self-stretch my-auto opacity-50">
            Home 
          </a>
          <span className="self-stretch my-auto">/ My Account</span>
        </div>
        <div className="leading-5 text-red-500">
          Welcome! <span className="text-red-500">Md Rimel</span>
        </div>
      </div>
      <main className="self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <AccountNavigation />
          <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
            <ProfileForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
