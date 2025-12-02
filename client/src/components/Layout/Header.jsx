 import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            <span className="text-teal-600">My</span>
            <span className="text-gray-600">Auth</span>
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
          className={`flex flex-col md:flex-row gap-6 md:gap-10 font-medium absolute md:static left-0 w-full md:w-auto px-6 md:px-0 transition-all duration-300 bg-white md:bg-transparent ${
            open ? "top-16 py-6 shadow-md" : "top-[-450px]"
          }`}
        >
          <li>
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 underline underline-offset-4 font-semibold"
                  : "hover:text-teal-600 duration-200"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 underline underline-offset-4 font-semibold"
                  : "hover:text-teal-600 duration-200"
              }
            >
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/register"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-teal-600 text-white px-4 py-2 rounded-md font-semibold"
                  : "bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 duration-200"
              }
            >
              Register
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/verify-email"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 underline underline-offset-4 font-semibold"
                  : "hover:text-teal-600 duration-200"
              }
            >
              Verify
            </NavLink>
          </li>

          <li>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-red-600 duration-200"
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
