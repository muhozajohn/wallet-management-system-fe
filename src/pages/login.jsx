import React, { useEffect } from "react";
import Input from "../components/input";
import { FaUser, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { validateLogin } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import {
  selectLoginStatus,
  selectLoginError,
  getIsAuthenticated,
  makeLogin,
} from "../redux/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: async (values) => {
      await dispatch(makeLogin(values));
    },
  });
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [isAuthenticated, navigate]);
  return (
    <form action="" className="w-full">
      {loginError && (
        <div className="text-sm text-red-800 font-normal mt-2">
          {loginError.message ? loginError.error : loginError}
        </div>
      )}
      <div className="flex flex-col">
        <Input
          type="input"
          placeholder="Email"
          id="email"
          icon={<FaUser />}
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
          loading ? <Spinner classes={` !text-black !h-6 !w-6`} /> : "Login"
        }
        styles={`w-full !scale-100 mt-6 mdl:mt-12 !bg-slate-200 text-black`}
      />
    </form>
  );
};

export default Login;
