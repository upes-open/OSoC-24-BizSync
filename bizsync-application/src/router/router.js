import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../_root/RootLayout";
import ErrorPage from "../components/ErrorElement";
import Home from "../_root/pages/Home";
import AuthLayout from "../_auth/AuthLayout";
import SignIn from "../_auth/pages/SignIn";
import SignUp from "../_auth/pages/SignUp";
import ResetPwd from "../_auth/pages/ResetPwd";
import Otp from "../_auth/pages/Otp";
import ResetPage from "../_auth/pages/ResetPage";
import DashboardLayout from "../_dashboard/DashboardLayout";
import DashboardHome from "../_dashboard/pages/DashboardHome";
import Receivables from "../_dashboard/pages/Receivables";
import Spends from "../_dashboard/pages/Spends";
import Inventory from "../_dashboard/pages/Inventory";
import Notifications from "../_dashboard/pages/Notifications";
// import ErrorPage from "../error-page";

export const router = createBrowserRouter([
  // public
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  // dashboard
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <DashboardHome />,
      },
    ],
  },

  // auth
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ResetPwd />,
      },
      {
        path: "/otp",
        element: <Otp />,
      },
      {
        path: "/change-password",
        element: <ResetPage />,
      },
    ],
  },
]);
