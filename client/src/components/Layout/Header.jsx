 import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#0E172A] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">

        {/* Brand */}
        <NavLink to="/">
          <h1 className="text-3xl font-extrabold tracking-wide">
            <span className="text-[#06B6D4]">My</span>
            <span className="text-gray-200">Auth</span>
          </h1>
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-4xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* Navigation */}
        <ul
          className={`flex flex-col md:flex-row gap-7 text-lg font-medium absolute md:static left-0 w-full md:w-auto px-6 md:px-0 bg-[#0E172A] transition-all duration-300 ${
            open ? "top-20 py-6 shadow-lg" : "top-[-500px]"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#06B6D4] font-semibold underline underline-offset-4"
                  : "hover:text-[#06B6D4] transition"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#06B6D4] font-semibold underline underline-offset-4"
                  : "hover:text-[#06B6D4] transition"
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
