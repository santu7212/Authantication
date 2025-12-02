 import React from "react";
import { useNavigate } from "react-router-dom";

const  ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen bg-white px-6">
      {/* Big faded 404 in background */}
      <h1 className="absolute text-[25rem] font-extrabold text-gray-100 select-none leading-none">
        404
      </h1>

      {/* Main text */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 z-10">
        We lost this page
      </h2>
      <p className="text-gray-500 mt-3 text-lg z-10 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Search box */}
      <div className="flex items-center gap-2 mt-8 w-full max-w-xl z-10">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search our site"
        />
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium">
          Search
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8 z-10">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
        >
          ← Go back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
        >
          Go home
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;