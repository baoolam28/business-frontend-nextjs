"use client"
import Customer from "../../../components/component/dashboard-customer";
import { useStore } from "../../../context/StoreContext";
import StoreLocked from "../../../components/store-page/Store-Locked";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function page() {

  const {store} = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(store){
      setLoading(false);
    }
  },[store]);

  
  if(store && !store.active){
    return <StoreLocked/>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return <Customer />;
}
