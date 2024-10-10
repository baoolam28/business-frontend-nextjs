"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";


// User Context
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  // Khi session đã sẵn sàng, gán giá trị vào state user
  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
