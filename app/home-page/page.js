import React from "react";
import HomePage from "../../components/home-page/pages/HomePage"

export const metadata = {
  title: 'Home Page',
  description: 'This is a description for My Custom Site',
};

export default function page() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
    