import React from "react";
import { Link } from "react-router-dom";

const FormSubHeader = ({ text, pageName, path }) => {
  return (
    <div className="flex items-baseline gap-1 justify-center my-2">
      <span className="text-xs opacity-70">{text}</span>
      <Link to={path}>
        <span className="capitalize font-medium text-blue-700 hover:underline">{pageName}</span>
      </Link>
    </div>
  );
};

export default FormSubHeader;
