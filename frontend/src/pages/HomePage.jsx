import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {LogoIcon} from '../clientRoutes'
const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="w-11/12 max-w-[700px] h-fit py-8 px-4 bg-neutral-200 flex flex-col items-center text-center rounded border border-neutral-300">
      <LogoIcon />
      <h2 className="text-xl md:text-2xl font-semibold capitalize">
        {userInfo ? `Welcome ${userInfo.name}` : "Mern Authentication"}
      </h2>
      <p className="w-[90%] max-w-[500px] my-5 text-sm">
        This is a boilerplate for MERN authentication that stores a JWT in an
        HTTP-Only cookie. It also uses Redux toolkit and Tailwind CSS.
      </p>
      {userInfo ? null : (
        <span className="flex items-center gap-3">
          <Link
            to="/login"
            type="button"
            className=" capitalize px-2 py-1 bg-blue-600 text-neutral-100 rounded text-sm hover:bg-blue-800 transition-shadow hover:shadow-md hover:shadow-blue-900/40"
          >
            log in
          </Link>
          <Link
            to="/register"
            type="button"
            className=" capitalize px-2 py-1 bg-blue-600 text-neutral-100 rounded text-sm hover:bg-blue-800 transition-shadow hover:shadow-md hover:shadow-blue-900/40"
          >
            register
          </Link>
        </span>
      )}
    </div>
  );
};

export default HomePage;
