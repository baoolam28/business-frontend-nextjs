"use client"

import React from 'react'
import Layout from '../../components/home-page/Layout'
import OtpVerification from './otp-verification';

export default function OtpPage() {
    return (
  
      <Layout>
      <div className="flex overflow-hidden flex-col bg-white">
        <div className="" />
          <OtpVerification />
        </div>
      </Layout>
    )
  }