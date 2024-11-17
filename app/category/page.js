import React from 'react'
import Category from '../../components/home-page/Category'
import { Suspense } from "react";
import Loading from "../../components/component/loading-lottie";
import Animation from "../../utils/lottie-animations/astronot.json";
export default function () {
  return (
    <div>
      <Suspense fallback={<Loading animation={Animation} />}>
        <Category />
      </Suspense>
    </div>
  );
}
