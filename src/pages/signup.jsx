import React from "react";
import Input from "../components/input";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { validateAuth } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import {
  selectLoginStatus,
  selectLoginError,
  makeSignup,
} from "../redux/auth/authSlice";
import { notifySuccess } from "../utils/notification";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
    validate: validateAuth,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("email", values.email);

      const resultAction = await dispatch(
        makeSignup({
          fullName: values.fullName,
          username: values.username,
          email: values.email,
          password: values.password,
        })
      );
      if (makeSignup.fulfilled.match(resultAction)) {
        formik.resetForm();
        notifySuccess("Application Successfully!");
        // set timeout
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        if (resultAction.payload) {
          console.log("Signup Error:", resultAction.payload);
          formik.resetForm();
        } else {
          console.log("Signup Error:", resultAction.error);
          formik.resetForm();
        }
      }
    },
  });

  return (
    <form action="" className="w-full">
      {loginError && (
        <div className="text-sm text-red-800 font-normal mt-2">
          {loginError.message ? loginError.error : loginError}
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-full">
          <Input
            type="input"
            placeholder="FullName"
            id="fullName"
            icon={<FaUser />}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <p className="text-sm text-red-800 font-normal">
              {formik.errors.fullName}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col w-full">
          <Input
            type="input"
            placeholder="Username"
            id="username"
            icon={<FaUser />}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="text-sm text-red-800 font-normal">
              {formik.errors.username}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col">
        <Input
          type="input"
          placeholder="Email"
          id="email"
          icon={<FaEnvelope />}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          values={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-sm text-red-800 font-normal">
            {formik.errors.email}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col">
        <Input
          type="input"
          placeholder="Password"
          inputType="password"
          id="password"
          icon={<FaLock />}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          values={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-sm text-red-800 font-normal">
            {formik.errors.password}
          </p>
        ) : null}
      </div>
      <Button
        click={() => formik.submitForm()}
        title={
          loading ? <Spinner classes={` !text-black !h-6 !w-6`} /> : "Sign Up"
        }
        styles={`w-full !scale-100 mt-6 mdl:mt-12 !bg-slate-200 text-black`}
      />
    </form>
  );
};

export default Signup;
