import React from 'react'
import ContactPageComponent from "../../components/contact-page/pages/ContactPage"

export const metadata = {
  title: 'Contact' ,
  description: 'This is a description for My Custom Site',
};

export default function Contact() {
  return (
    <div>
       <ContactPageComponent />
    </div>
  )
}
