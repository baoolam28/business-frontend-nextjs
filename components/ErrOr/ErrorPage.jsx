/**
 * This code was generated by Builder.io.
 */
import React from "react";

function ErrorPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <nav
        aria-label="Breadcrumb"
        className="flex gap-3 items-center text-sm text-gray-600"
      >
        <a href="/" className="opacity-70 hover:underline">
          Home
        </a>
        <span className="text-gray-800">404 Error</span>
      </nav>
      <section className="flex flex-col items-center mt-10">
        <h1 className="text-9xl font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500 drop-shadow-lg max-md:text-6xl">
          404
        </h1>
        <h2 className="text-4xl font-medium text-gray-800 mt-4 max-md:text-2xl">
          Not Found
        </h2>
        <p className="mt-5 text-lg text-gray-600 max-md:text-base">
          The page you're looking for doesn't exist. You may return to the home page.
        </p>
      </section>
      <a
        href="/"
        className="px-12 py-4 mt-10 text-base font-semibold bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-500 rounded-full text-white shadow-lg transform transition-transform duration-300 hover:scale-105 max-md:px-5"
      >
        Back to home page
      </a>
    </main>
  );
}

export default ErrorPage;