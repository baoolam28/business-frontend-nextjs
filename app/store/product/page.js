"use client"
import { useRouter } from "next/navigation";
import Product from "../../../components/component/dashboard-product";
import { useStore } from "../../../context/StoreContext";
import StoreLocked from "../../../components/store-page/Store-Locked";
import { useEffect, useState } from "react";
export default function product() {

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
      <Product />
    </div>
  );
}
