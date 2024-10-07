'use client'

import GoogleSignInButton from './google-signin-button'

export function SigninPage() {
  const handleGoogleSignIn = () => {
    // Implement your Google Sign-In logic here
    console.log('Google Sign-In clicked')
  }

  return (
    (<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
          Sign in to your account
        </h1>
        
      </div>
    </div>)
  );
}