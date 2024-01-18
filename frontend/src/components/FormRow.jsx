import React from "react";

const FormRow = ({
  type,
  register,
  icon,
  eyeIcon,
  togglePwd,
  isPwd,
  placeholder,
  errors,
  emailExistError,
  autoFocus
}) => {
  return (
    <div className="w-full grid place-items-center mb-5">
      <div className="flex items-center justify-center gap-2 w-4/5 max-w-[500px]">
        <span className="text-lg text-neutral-800/60 md:text-xl">{icon}</span>
        <span
          className={`w-full flex items-center text-sm md:text-base font-normal text-neutral-800/95 border-b ${
            errors || emailExistError
              ? "border-red-600 focus-within:border-b-red-600 "
              : "border-b-neutral-800/20"
          } focus-within:border-b-blue-600`}
        >
          <input
            type={type}
            {...register}
            className={`w-full px-2 outline-none h-8 bg-transparent `}
            placeholder={placeholder}
            autoFocus={autoFocus}
          />
          <span
            className={`${placeholder === "Email" ? "block" : "hidden"} pr-2`}
          >
            @test.com
          </span>
        </span>
        <button
          type="button"
          className={`${
            isPwd ? "block" : "hidden"
          } text-lg md:text-xl outline-none text-neutral-500 focus-within:text-blue-600`}
          onClick={togglePwd}
        >
          {eyeIcon}
        </button>
      </div>
      <div className="w-4/5 [font-size:0.68rem] text-red-600 font-medium flex justify-start pl-7 pt-1">
        {errors || emailExistError}
      </div>
    </div>
  );
};

export default FormRow;
