import React from 'react'
import ChatBoxPage from '../../components/chat-box/chat-box-page'
import EnhancedChatBox from "../../components/chat-box/enhanced-chat-box";
import ChatButton from "../../components/component/chat-button"

export default function page() {
  
  return (
    <div>
      {/* <ChatBoxPage /> */}
      <EnhancedChatBox />
      <ChatButton
        
        buttonText={"Chat ngay"}
        customClass={
          "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg shadow-purple-500/50"
        }
        storeId={"7c41e577-84ee-11ef-8000-35a59ac5db33"}
      />
    </div>
  );
}
