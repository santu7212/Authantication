import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AppLayout from "./components/Layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
 import { ToastContainer, toast } from 'react-toastify';
import EnterResetOTP from "./pages/EnterResetOTP";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/reset-password", element: <ResetPassword /> },
      {path:"/enter-reset-otp",element:<EnterResetOTP/>},
      { path: "/verify-email", element: <VerifyEmail /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
