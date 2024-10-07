"use client"
import { createContext, useContext, useState, useEffect } from "react";
import sellerAPI from "../api/seller";
import { useUser } from "./UserContext"; // Sử dụng UserContext để lấy userId

// Store Context
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeId, setStoreId] = useState(null);
  const { user } = useUser(); 


  useEffect(() => {
    if (user && user.id) {
      async function fetchStore() {
        try {
          const res = await sellerAPI.store.getStoreByUserId(user.id);
          setStoreId(res.data.storeId);
        } catch (error) {
          console.error("Error fetching store:", error);
        }
      }
      fetchStore();
    }
  }, [user]);

  return (
    <StoreContext.Provider value={{ storeId, setStoreId }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
