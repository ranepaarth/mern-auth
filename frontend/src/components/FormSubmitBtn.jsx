import React from "react";

const FormSubmitBtn = ({ text, icon }) => {
  return (
    <button
      type="submit"
      className="capitalize w-fit max-w-[300px] bg-blue-600 rounded py-2 px-4 text-neutral-100 font-medium hover:bg-blue-700 hover:shadow-md hover:shadow-blue-900/30 hover:sca outline-none focus-within:outline focus-within:outline-blue-600 flex items-center justify-center gap-3 transition-transform"
    >
      <p>{text}</p>
    </button>
  );
};

export default FormSubmitBtn;
