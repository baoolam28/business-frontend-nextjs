"use client"
import React from 'react'
import Layout from '../../components/home-page/Layout'
import Review from './product-review-page';

export default function ReviewPage() {
  return (
    <Layout>
    <div className="flex overflow-hidden flex-col bg-white">
      <div className="" />
        <Review />
      </div>
    </Layout>
  )
}
