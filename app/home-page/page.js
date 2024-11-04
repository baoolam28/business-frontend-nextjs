import React from "react";
import HomePage from "../../components/home-page/pages/HomePage"
import Loading from "../../components/component/loading-lottie"
import animationData from "../../utils/lottie-animations/rocket.json"; 
export default function page() {
  return (
    <div>
      <Loading animation={animationData} />
      <HomePage />
    </div>
  );
}
    