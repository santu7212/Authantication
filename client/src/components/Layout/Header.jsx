import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const { user, setUser, setIsLoggedIn, backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendURL + "/api/user/logout");
      if (data?.success) {
        setUser(false);
        setIsLoggedIn(false);
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="bg-[#0E172A] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <NavLink to="/">
          <h1 className="text-3xl font-extrabold tracking-wide">
            <span className="text-[#06B6D4]">My</span>
            <span className="text-gray-200">Auth</span>
          </h1>
        </NavLink>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              {user.isAccountVerified ? (
                <p className="text-green-400 font-medium">Verified</p>
              ) : (
                <NavLink
                  to="/verify-email"
                  className="text-red-400 hover:text-red-500 transition font-medium"
                >
                  Verify Email
                </NavLink>
              )}

              <p
                onClick={logout}
                className=" cursor-pointer text-red-400 hover:text-red-500 transition font-medium"
              >
                Logout
              </p>

              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#06B6D4] text-black font-bold uppercase">
                {user?.name?.charAt(0)}
              </div>
            </>
          ) : (
            <NavLink to="/login" className="hover:text-[#06B6D4] transition">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
