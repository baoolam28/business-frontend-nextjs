"use client"
import { createContext, useContext, useState, useEffect } from "react";
import sellerAPI from "../api/seller";
import { useUser } from "./UserContext"; // Sử dụng UserContext để lấy userId

// Store Context
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeId, setStoreId] = useState(null);
  const [store, setStore] = useState(null);  
  const { user } = useUser(); 


  useEffect(() => {
    if (user && user.id) {
      async function fetchStore() {
        
        try {
          const res = await sellerAPI.store.getStoreByUserId(user.id);
          if(res.statusCode === 200) {
            setStoreId(res.data.storeId);
            setStore(res.data);
          }
          
        } catch (error) {
          console.error("Error fetching store:", error);
        }
      }
      fetchStore();
    }
  }, [user]);

  return (
    <StoreContext.Provider value={{ storeId, store }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
