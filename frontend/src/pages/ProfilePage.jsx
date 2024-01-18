import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { RxUpdate } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import {
  FormBody,
  FormContainer,
  FormHeader,
  FormRow,
  FormSubmitBtn,
} from "../clientRoutes";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import registerOptions from "./registerOptions";
import updateProfileRegisterOptions from "./updateProfileRegisterOptions";

const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
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
  const [profileAvatar, setProfileAvatar] = useState(
    "https://p7.hiclipart.com/preview/442/477/305/computer-icons-user-profile-avatar-profile.jpg"
  );
  const [apiError, setApiError] = useState(null);
  const { pathname } = useLocation();
  const breadcrumbs = pathname.split("/");
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const togglePwd = () => {
    setShowPwd((prev) => !prev);
  };

  useEffect(() => {
    const getAvatar = async () => {
      const response = await fetch(
        `https://api.multiavatar.com/${userInfo?.name}.png`
      );
      // console.log(response)
      const avatar = response.url;
      setProfileAvatar(avatar);
    };
    getAvatar();
    setValue("name", userInfo?.name);
    const email = userInfo?.email?.split("@")[0];
    setValue("email", email);
  }, [userInfo?.name, userInfo?.email]);

  const onFormSubmit = async (data) => {
    const validEmail = data.email + "@test.com";
    try {
      const response = await updateProfile({
        _id: userInfo._id,
        name: data.name,
        email: validEmail,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ ...response }));
      setApiError(null);
      toast.success("Profile updated successfully", {
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
      resetField("password");
      resetField("confirmPassword");
    } catch (err) {
      if (err?.data?.message === "Oops!! Email already taken. Try another") {
        setApiError(err?.data?.message);
      }
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
    <>
      <FormContainer>
        <div className="w-full flex items-center justify-center mb-2">
          <img
            src={`${profileAvatar}`}
            alt={userInfo.name}
            className="h-16 w-16 object-cover border rounded-full border-neutral-700 p-px"
          />
        </div>
        <FormHeader header={"Update Profile"} />
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
          />
          <FormRow
            type={"email"}
            register={register("email", registerOptions.email)}
            icon={<MdOutlineAlternateEmail />}
            idPwd={false}
            placeholder={"Email"}
            errors={errors?.email?.message}
            emailExistError={apiError}
          />
          <FormRow
            type={showPwd ? "text" : "password"}
            register={register(
              "password",
              updateProfileRegisterOptions.password
            )}
            icon={<PiPasswordBold />}
            eyeIcon={showPwd ? <IoMdEye /> : <IoMdEyeOff />}
            togglePwd={togglePwd}
            isPwd={true}
            placeholder={"Change Password"}
            errors={errors?.password?.message}
          />
          <FormRow
            type={showPwd ? "text" : "password"}
            register={register("confirmPassword", {
              validate: (val) => {
                if (watch("password") !== val)
                  return "Those passwords didn't match. Try again";
              },
            })}
            icon={<PiPasswordBold />}
            eyeIcon={showPwd ? <IoMdEye /> : <IoMdEyeOff />}
            togglePwd={togglePwd}
            isPwd={false}
            placeholder={"Confirm Changed Password"}
            errors={errors?.confirmPassword?.message}
          />
          {isLoading && <span className="loader"></span>}
          <FormSubmitBtn text={"update profile"} icon={<RxUpdate />} />
        </FormBody>
      </FormContainer>
    </>
  );
};

export default ProfilePage;
