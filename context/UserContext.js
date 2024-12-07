"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";


// User Context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user || null); 

  useEffect(() => {
    if (session && session.user) {
      // Kiểm tra xem user đã khác chưa trước khi cập nhật
      if (!user || user.username !== session.user.username) {
        setUser(session.user);
      }
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
