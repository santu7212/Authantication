 import React from "react";

const Header = () => {
  return (
    <header className="shadow-md bg-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
          MyApp
        </h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 text-gray-700 text-lg">
          <li>
            <a href="/" className="hover:text-blue-600 transition duration-200">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-600 transition duration-200">
              About
            </a>
          </li>
          <li>
            <a href="/login" className="hover:text-blue-600 transition duration-200">
              Login
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Register
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
