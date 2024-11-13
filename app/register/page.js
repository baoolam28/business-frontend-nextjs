import React from 'react'
import RegisterPage from "../../components/register-page/SignUpPage"

export const metadata = {
  title: 'Register',
  description: 'This is a description for My Custom Site',
};

export default function Register() {
  return (
    <div>
        <RegisterPage/>
    </div>
  )
}
