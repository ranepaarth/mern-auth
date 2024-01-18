import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div className="w-full min-h-screen bg-neutral-100">
      <Header />
      <main className="px-[5%] md:px-[10%] grid place-items-center my-10">
        <ToastContainer />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
