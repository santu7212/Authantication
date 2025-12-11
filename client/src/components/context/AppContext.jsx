import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);

  const getAuthStatus = async () => {
    try {
        axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendURL + "/api/user/is-auth", {
         
      });

      if (data.success) {
        getUserData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getUserData = async () => {
    try {
        axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendURL + "/api/user/get-user", {
        
        
      });
      data.success ? setUser(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getAuthStatus();
  }, []);

  const value = {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
