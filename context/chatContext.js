"use client";
import React, { createContext, useContext, useState } from "react";

// Tạo context
const ChatContext = createContext();

// Tạo provider
export const ChatProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <ChatContext.Provider
      value={{ isExpanded, setIsExpanded, selectedFriend, setSelectedFriend }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
