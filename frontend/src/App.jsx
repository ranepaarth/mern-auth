import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AppLayout,
  HomePage,
  LoginPage,
  ProfilePage,
  ProtectedRoute,
  RegisterPage,
} from "./clientRoutes";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "",
          element: <ProtectedRoute />,
          children: [{ path: "profile", element: <ProfilePage /> }],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
