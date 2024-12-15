"use client"
import React from 'react'
import StoreRegistration from "./store-registration"
import StoreVerifying from "../../components/store-page/Store-Verifying"
import { useStore } from '../../context/StoreContext'
import { useRouter } from 'next/navigation';

export default function StorePage() {

  const {store} = useStore();
  const router = useRouter();


  if(store && store.active){
    router.push("/store/product");
  }

  if(store && !store.active){
    return <StoreVerifying/>
  }

  return (
    <div>
      <StoreRegistration/>
    </div>
  )
}
