import React from "react";
import logoIcon from "../assets/title-icon.svg";
const LogoIcon = () => {
  return (
    <div className="w-full flex items-center justify-center mb-2">
      <img
        src={logoIcon}
        alt=""
        className="w-16 object-cover border rounded-full border-blue-500"
      />
    </div>
  );
};

export default LogoIcon;
