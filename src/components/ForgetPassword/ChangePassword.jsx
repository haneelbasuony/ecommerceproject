import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';

export default function ChangePassword() {
  const navigate = useNavigate();

  async function handleCode(values) {
    try {
      let { data } = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        { email: values.email, newPassword: values.newPassword }
      );
      toast.success('You Have Changed Your Password');
      navigate('/');
      console.log(data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';
      toast.error(errorMessage);
    }
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required('Email is required')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ),
    newPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&#]/,
        'Password must contain at least one special character'
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    onSubmit: handleCode,
    validationSchema,
  });
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="mb-5 font-bold text-center text-lg">
          Reset Your Password
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-900 font-bold"
            >
              Please Enter Your Email
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              id="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
              placeholder=" "
              required
            />
            {formik.errors.email && formik.touched.email ? (
              <Alert alertMsg={formik.errors.email} />
            ) : (
              ''
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm text-gray-900 font-bold"
            >
              Please Enter Your New Password
            </label>
            <input
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              id="newPassword"
              name="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
              placeholder=" "
              required
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <Alert alertMsg={formik.errors.newPassword} />
            ) : (
              ''
            )}
          </div>

          <button
            type="submit"
            className="mt-5 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
