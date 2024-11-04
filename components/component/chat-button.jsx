"use client"
import React from 'react';
import { useUser } from "../../context/UserContext"
import { findChat, createChat } from "../../utils/chatApi"
import {useChatContext} from "../../context/chatContext"
const ContactSellerButton = ({ buttonText, customClass, storeId }) => {

    const { setIsExpanded } = useChatContext();
    const { user } = useUser();

    const handleContactSeller = async () => {
        
        const chat = await isConnect();

        if(chat){
            console.log("User is already connected to the chat", chat);
            setIsExpanded(true)
            return
        }

        console.log("connect seller failed", chat);

    };
    
    const isConnect = async () => {

        if(!user || !storeId) return null;

        const exitsChat = await findChat(user.id, storeId);

        if(exitsChat) {
            return exitsChat;
        }

        const newChat = await createChat(user.id, storeId);

        return newChat;
    };

  return (
    <button
      onClick={handleContactSeller}
      className={`flex items-center py-1 px-2 text-sm rounded-full transition duration-300 ${customClass}`}
    >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.5a8.38 8.38 0 01-1.5 4.8c-1.8 2.4-4.8 4-8 4s-6.2-1.6-8-4a8.38 8.38 0 01-1.5-4.8c0-4.4 3.6-8 8-8s8 3.6 8 8zm-4 0h.01"
        />
      </svg>
      {buttonText}
    </button>
  );
};

export default ContactSellerButton;
