"use client"
import { useRouter } from "next/navigation";
import Dashboard from "../../../components/component/dashboard";
import Main from "../../../components/component/dashboard-main";

import { useEffect, useState } from "react";
import StoreLocked from "../../../components/store-page/Store-Locked";
import { useStore } from "../../../context/StoreContext";

export default function dashboard() {

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

  return <Main />;
}
