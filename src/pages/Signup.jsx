import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineErrorOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function Signup() {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const handleRegister = async (values) => {
    //call api => user data > database
    // console.log(values);
    setisloading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success("Successfully Signed Up !");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");

      setisloading(false);
    }
    setisloading(false);
  };
  const validation = Yup.object().shape({
    name: Yup.string()
      .required("Full Name is required")
      .min(6, "Full name must be at least 6 characters")
      .max(15),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter Egyption number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/^[A-Z][a-z0-9]{3,10}$/, "Password must start with uppercase ")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });
  const formik = useFormik({
    initialValues: user,
    onSubmit: handleRegister,
    validationSchema: validation,
  });

  return (
    <div className="py-5">
      <h1 className="text-green-700 font-bold mb-8 text-4xl text-center">
        Registeration
      </h1>
      <div className="md:w-[60%] mx-auto md:p-0 p-5">
        <form
          className="max-w-md mx-auto space-y-10"
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
              {formik.errors.name && formik.touched.name && (
                <div
                  className="p-2 flex text-sm text-red-800 rounded-lg bg-red-50 mt-5"
                  role="alert"
                >
                  <MdOutlineErrorOutline className="text-xl mr-2" />
                  {formik.errors.name}
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative z-0 w-full group">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
              {formik.errors.phone && formik.touched.phone && (
                <div
                  className="p-2 flex text-sm text-red-800 rounded-lg bg-red-50 mt-5"
                  role="alert"
                >
                  <MdOutlineErrorOutline className="text-xl mr-2" />
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-2 flex  text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-bold ">
                <MdOutlineErrorOutline className="text-xl mr-2" />
              </span>
              {formik.errors.email}
            </div>
          )}
          <div className="relative z-0 w-full  group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>{" "}
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-2  flex  text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-bold ">
                <MdOutlineErrorOutline className="text-xl mr-2" />
              </span>
              {formik.errors.password}
            </div>
          )}
          <div className="relative z-0 w-full  group">
            <input
              type="password"
              name="rePassword"
              id="repassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="repassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div
              className="p-2  flex  text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-bold ">
                <MdOutlineErrorOutline className="text-xl mr-2" />
              </span>
              {formik.errors.rePassword}
            </div>
          )}
          <div className="flex">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 flex-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isloading ? (
                <ClipLoader color="#ffffff" size="20" />
              ) : (
                "Register"
              )}
            </button>
          </div>{" "}
          <p className="text-center">
            Already have an account ?
            <Link
              to="/"
              className="text-green-700 ml-2 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
