import React from "react";

const FormBody = ({ children, handleSubmit, onFormSubmit,onFormError }) => {
  return (
    <form onSubmit={handleSubmit(onFormSubmit,onFormError)} className="flex flex-col items-center mt-8" noValidate autoComplete="off">
      {children}
    </form>
  );
};

export default FormBody;
