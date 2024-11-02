"use client"
import { createContext, useContext, useState, useEffect, useCallback } from "react";
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
      console.log("Current userId:", user.id);      
      async function fetchStore() {
<<<<<<< HEAD
        
=======
        console.log("get storeID" );
>>>>>>> a9f3161a88c8c5b3e41a84810d1a016479d7ad1f
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
