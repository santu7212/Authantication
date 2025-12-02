 import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#0E172A] text-white shadow-[0_2px_12px_rgba(0,0,0,0.5)] sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            <span className="text-blue-500">My</span>
            <span className="text-red-500">Auth</span>
          </h1>
        </NavLink>

        {/* Hamburger — Mobile */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* Navigation */}
        <ul
          className={`flex flex-col md:flex-row gap-6 md:gap-10 font-medium absolute md:static left-0 w-full md:w-auto px-6 md:px-0 transition-all duration-300 ${
            open
              ? "top-16 py-6 bg-[#0E172A] shadow-lg"
              : "top-[-400px]"
          }`}
        >
          <li>
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 duration-200"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 duration-200"
            >
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/register"
              onClick={() => setOpen(false)}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 duration-200"
            >
              Register
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/verify-email"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 duration-200"
            >
              Verify
            </NavLink>
          </li>

          <li>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-red-500 duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
