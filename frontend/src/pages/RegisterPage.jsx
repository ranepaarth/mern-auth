import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong, FaUser } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import FormBody from "../components/FormBody";
import FormContainer from "../components/FormContainer";
import FormHeader from "../components/FormHeader";
import FormRow from "../components/FormRow";
import FormSubHeader from "../components/FormSubHeader";
import FormSubmitBtn from "../components/FormSubmitBtn";
import LogoIcon from "../components/LogoIcon";
import { useRegisterUserMutation } from "../slices/usersApiSlice";
import registerOptions from "./registerOptions";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPwd, setShowPwd] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const togglePwd = () => {
    setShowPwd((prev) => !prev);
  };

  const onFormSubmit = async (data) => {
    const validEmail = data.email + "@test.com";
    try {
      const response = await registerUser({
        name: data.name,
        email: validEmail,
        password: data.password,
      }).unwrap();
      navigate("/login");
      if (response) {
        toast.success("User registered successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }
      setSuccess((prev) => !prev);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || err?.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };
  const onFormError = (error) => {
    console.log("Please follow the guidelines while filling out the details");
  };
  return (
    <FormContainer>
      <LogoIcon />
      <FormHeader header={"register"} />
      <FormSubHeader
        text={"Have an account?"}
        pageName={"log in"}
        path={"/login"}
      />
      <FormBody
        handleSubmit={handleSubmit}
        onFormSubmit={onFormSubmit}
        onFormError={onFormError}
      >
        <FormRow
          type={"text"}
          register={register("name", registerOptions.name)}
          icon={<FaUser />}
          idPwd={false}
          placeholder={"Name"}
          errors={errors?.name?.message}
          autoFocus={true}
        />
        <FormRow
          type={"email"}
          register={register("email", registerOptions.email)}
          icon={<MdOutlineAlternateEmail />}
          idPwd={false}
          placeholder={"Email"}
          errors={errors?.email?.message}
          emailExistError={error?.data?.message}
        />
        <FormRow
          type={showPwd ? "text" : "password"}
          register={register("password", registerOptions.password)}
          icon={<PiPasswordBold />}
          eyeIcon={showPwd ? <IoMdEye /> : <IoMdEyeOff />}
          togglePwd={togglePwd}
          isPwd={true}
          placeholder={"Password"}
          errors={errors?.password?.message}
        />
        <FormRow
          type={showPwd ? "text" : "password"}
          register={register("confirmPassword", {
            required: true,
            validate: (val) => {
              if (watch("password") !== val)
                return "Those passwords didn't match. Try again";
            },
          })}
          icon={<PiPasswordBold />}
          eyeIcon={showPwd ? <IoMdEye /> : <IoMdEyeOff />}
          togglePwd={togglePwd}
          isPwd={false}
          placeholder={"Confirm Password"}
          errors={errors?.confirmPassword?.message}
        />
        {!isLoading && success && (
          <p className="text-sm text-neutral-600 font-medium my-2">
            User registered successfully!!{" "}
            <Link
              to="/login"
              className="px-1 text-base text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        )}
        {isLoading && !success && <span className="loader"></span>}
        <FormSubmitBtn text={"register"} icon={<FaArrowRightLong />} />
      </FormBody>
    </FormContainer>
  );
};

export default RegisterPage;
