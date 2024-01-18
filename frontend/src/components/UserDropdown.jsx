import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdLogOut } from "react-icons/io";
import { MdHomeFilled } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const UserDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className="outline-none px-2 py-2 hover:bg-neutral-500 rounded capitalize flex items-center gap-1"
      >
        <span>{userInfo.name}</span>
        <span>
          {showDropdown ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </span>
      </button>
      {showDropdown && (
        <div className="dropdown absolute top-[4.5rem] right-[5%] md:right-[10%] bg-neutral-300 px-3 py-2 border border-neutral-400 shadow-md text-neutral-600 flex flex-col items-center rounded">
          <NavLink to="/profile">
            <span className="flex gap-3 items-center py-1 hover:bg-neutral-400/70 px-2 rounded transition-transform">
              <img
                src={`https://api.multiavatar.com/${userInfo.name}.png`}
                alt="img"
                className="w-7 rounded-full border border-neutral-800 p-px"
              />
              <p className="md:text-lg font-medium">Profile</p>
            </span>
          </NavLink>
          <NavLink to="/">
            <span className="flex gap-4 items-center py-1 hover:bg-neutral-400/70 px-3 rounded transition-transform">
              <p className="text-xl">
                <MdHomeFilled />
              </p>
              <p className="md:text-lg font-medium">Home</p>
            </span>
          </NavLink>
          <hr className="border-px w-full border-neutral-500/40 my-1" />
          <span className="hover:bg-neutral-400/70 px-2 rounded transition-transform">
            <button
              type="button"
              className="flex gap-3 items-center py-1"
              onClick={logoutHandler}
            >
              <p className="text-xl">
                <IoMdLogOut />
              </p>
              <p className="md:text-lg font-medium">Logout</p>
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
