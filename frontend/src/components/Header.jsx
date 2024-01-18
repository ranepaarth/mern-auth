import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { LuUserPlus2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import UserDropdown from "./UserDropdown";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <header className="flex items-center justify-between py-3 bg-neutral-800 px-[5%] md:px-[10%] text-neutral-100">
      <Link to="/">
        <span className="text-xl font-semibold text-neutral-400 border-b-neutral-400 border-b-4 hover:text-neutral-300 transition-colors hover:border-b-neutral-300">
          MERN Auth
        </span>
      </Link>
      {userInfo ? (
        <div>
          <UserDropdown />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm">
          <NavLink to="/login">
            <span className="capitalize px-2 py-2 rounded text-neutral-300 font-medium hover:text-neutral-800  hover:bg-neutral-500 transition-colors flex items-center gap-1">
              <p className="text-lg">
                <IoMdLogIn />
              </p>
              <p>log in</p>
            </span>
          </NavLink>
          <NavLink to="/register">
            <span className="capitalize px-2 py-2 rounded text-neutral-300 font-medium hover:text-neutral-800  hover:bg-neutral-500 transition-colors flex items-center gap-1">
              <p className="text-lg">
                <LuUserPlus2 />
              </p>
              <p>register</p>
            </span>
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
