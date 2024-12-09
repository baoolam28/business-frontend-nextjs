import React from 'react'
import StorePage from "../../components/store-page/store-page"
export const metadata = {
  title: 'Store ',
  description: 'This is a description for My Custom Site',
};
export default function page() {
  return (
    <div>
      <StorePage/>
    </div>
  );
}



