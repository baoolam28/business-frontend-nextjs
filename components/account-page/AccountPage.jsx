"use client"
import React, { useEffect, useState } from "react";
import Header from "../../components/component/Header";
import AccountNavigation from "./AccountNavigation";
import ProfileForm from "./ProfileForm";
import Footer from "./Footer";
import UserAPI from "../../api/auth";
import { useUser } from "../../context/UserContext";

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.id) {
        console.error("User ID is missing");
        return;
      }
      console.log("Fetching user data for user ID:", user.userID);

      try {
        const response = await UserAPI.user.getInfoUser(user.id);
        if (response.statusCode === 200) {
          setUserData(response.data);
          console.log("User data:", response.data);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error connecting to API:", error);
      }
    };

    if (user && user.id) {
      fetchUserData();
    }
  }, [user]); // Thêm user vào dependencies

  return (
    <div className="flex flex-col bg-white">
      <Header />
      <div className="flex flex-wrap gap-10 self-center mt-20 w-full text-sm max-w-[1170px] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-1 gap-3 items-center text-black">
          {/* <a href="#" className="self-stretch my-auto opacity-50">Home</a>
          <span className="self-stretch my-auto">/ My Account</span> */}
        </div>
        <div className="leading-5 text-red-500">
          Welcome! <span className="text-red-500">{userData ? userData.fullName : "Guest"}</span>
        </div>
      </div>
      <main className="self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <AccountNavigation />
          <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
            <ProfileForm userData={userData} /> {/* Truyền userData vào ProfileForm */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
