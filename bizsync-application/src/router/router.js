import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../_root/RootLayout";
import ErrorPage from "../components/ErrorElement";
import Home from "../_root/pages/Home";
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
]);
