import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import {
  FormBody,
  FormContainer,
  FormHeader,
  FormRow,
  FormSubHeader,
  FormSubmitBtn,
  LogoIcon,
} from "../clientRoutes";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import registerOptions from "./registerOptions";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const togglePwd = () => {
    setShowPwd((prev) => !prev);
  };

  const getCredentials = () => {
    setValue("email",'testuser')
    setValue("password",'Test@123')
  };

  const onFormSubmit = async (data) => {
    const validEmail = data.email + "@test.com";
    try {
      const response = await login({
        email: validEmail,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
      console.log(response);
    } catch (error) {
      toast.error(error?.data?.message, {
        position: "top-center",
        autoClose: 5000,
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
    console.log(error);
  };
  return (
    <FormContainer>
      <LogoIcon />
      <FormHeader header={"log in"} />
      <FormSubHeader
        text={"Create a new account?"}
        pageName={"register"}
        path={"/register"}
      />
      <FormBody
        handleSubmit={handleSubmit}
        onFormSubmit={onFormSubmit}
        onFormError={onFormError}
      >
        <FormRow
          type={"text"}
          register={register("email", registerOptions.email)}
          icon={<MdOutlineAlternateEmail />}
          idPwd={false}
          placeholder={"Email"}
          errors={errors?.email?.message}
          autoFocus={true}
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
        {isLoading && <span className="loader"></span>}
      <div className="flex justify-center items-center gap-2">
        <FormSubmitBtn text={"log in"} />
        <button
          type="button"
          className="px-4 py-2 border border-blue-700 rounded text-blue-700 hover:shadow-md hover:shadow-blue-950/30 text-nowrap focus-within:shadow-md focus-within:shadow-blue-950/30 outline-none"
          onClick={getCredentials}
        >
          Get Credentials
        </button>
      </div>
      </FormBody>
    </FormContainer>
  );
};

export default LoginPage;
