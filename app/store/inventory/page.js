"use client"
import { useStore } from "../../../context/StoreContext";
import Inventory from "../../../components/component/inventory";
import { useRouter } from "next/navigation";
import StoreLocked from "../../../components/store-page/Store-Locked";
import { useEffect, useState } from "react";

export default function inventory() {

  const { store } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (store) {
      setLoading(false);
    }
  }, [store]);

  if (store && !store.active) {
    return <StoreLocked />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Inventory />
    </div>
  );
}
