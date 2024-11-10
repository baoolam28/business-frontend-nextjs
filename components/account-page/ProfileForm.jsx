import React, { useState, useEffect } from "react";
import userAPI from "../../api/auth";
import { showErrorAlert, showSuccessAlert } from "../../utils/reactSweetAlert";
import ChangesPass from "../../components/changes-pass/password-change-modal";
const ProfileForm = ({ userData }) => {
  const [formData, setFormData] = useState({
    id : "" , 
    userName: "",
    fullName: "",
    email: "",
    phoneNumber: "", 
  });

  // Sử dụng useEffect để đổ dữ liệu từ userData vào formData khi userData thay đổi
  useEffect(() => {
    if (userData) {
      setFormData({
        id : userData.userID || "" , 
        userName: userData.username || "",
        fullName: userData.fullName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "" 
      });
    }
  }, [userData]);

  // Hàm xử lý sự thay đổi của các ô input
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userAPI.user.updateInfoUser(userData.userId, formData); // Truyền formData vào API
      if (response.statusCode === 200) {
        showSuccessAlert("Profile updated successfully!");
      } else { 
        showErrorAlert("Error", userData.message);
      }
    } catch (error) {
      showErrorAlert("No changes detected.");
    }
  };

  return (
    <div>
      <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden flex-col px-20 py-10 mx-auto w-full text-base bg-white rounded shadow-sm max-md:px-5 max-md:mt-10 max-md:max-w-full"
    >
      <h2 className="self-start text-xl font-medium leading-snug text-red-500">
        Edit Your Profile
      </h2>

      <div className="flex flex-col items-center mt-4 mb-6">
        <img
          src={userData?.imageName || "/default-avatar.png"}
          alt="User Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-red-500"
        />
        <button type="button" className="mt-2 text-sm text-red-500 hover:underline">
          Change Profile Picture
        </button>
      </div>

      {/* Ô input cho Username và Full Name */}
      <div className="flex flex-wrap gap-10 items-start mt-4 text-black max-md:max-w-full">
        {/* Ô input cho Username (read-only) */}
        <div className="flex flex-col min-w-[240px] w-[330px]">
          <label htmlFor="userName">Username</label>
          <div className="flex flex-col mt-2 max-w-full whitespace-nowrap w-[330px]">
            <input
              type="text"
              id="userName"
              value={formData.userName}
              readOnly
              className="flex overflow-hidden flex-col justify-center items-start px-4 py-3.5 rounded bg-neutral-100 cursor-not-allowed text-gray-500 max-md:pr-5"
              placeholder="Username"
            />
          </div>
        </div>

        {/* Ô input cho Full Name */}
        <div className="flex flex-col min-w-[240px] w-[330px]">
          <label htmlFor="fullName">Full Name</label>
          <div className="flex flex-col mt-2 max-w-full whitespace-nowrap w-[330px]">
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="flex overflow-hidden flex-col justify-center items-start px-4 py-3.5 rounded bg-neutral-100 max-md:pr-5"
              placeholder="Full Name"
            />
          </div>
        </div>
      </div>

      {/* Ô input cho Email */}
      <div className="flex flex-wrap gap-10 items-start mt-6 text-black max-md:max-w-full">
        <div className="flex flex-col whitespace-nowrap min-w-[240px] w-[330px]">
          <label htmlFor="email">Email</label>
          <div className="flex flex-col mt-2 max-w-full w-[330px]">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex overflow-hidden flex-col justify-center items-start px-4 py-3.5 rounded bg-neutral-100 max-md:pr-5"
              placeholder="Email"
            />
          </div>
        </div>

        {/* Ô input cho Phone Number */}
        <div className="flex flex-col min-w-[240px] w-[330px]">
          <label htmlFor="phoneNumber">Phone</label>
          <div className="flex flex-col mt-2 max-w-full w-[330px]">
            <input
              type="text"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="flex overflow-hidden flex-col justify-center items-start px-4 py-3.5 rounded bg-neutral-100 max-md:pr-5"
              placeholder="Phone Number"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center self-end mt-6 gap-8">
        
        <button type="button" className="self-stretch my-auto text-black">
          Cancel
        </button>
        <button
          type="submit"
          className="gap-2.5 self-stretch px-12 py-4 my-auto font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
        >
          Save Changes
        </button>
      </div>
    </form>
    <ChangesPass userData={userData}/>
    </div>
  );
};

export default ProfileForm;
