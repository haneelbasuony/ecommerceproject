import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import Alert from '../Alert/Alert';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userToken } from '../../Context/UserToken';

export default function Register() {
  let { setLogin } = useContext(userToken);

  let navigate = useNavigate();

  let [erroMsg, setErrorMsg] = useState('');
  let [loading, setLoading] = useState(false);

  async function handleRegister(values) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );
      if (data.message == 'success') {
        setLogin(data.token);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
      setLoading(false);
      setErrorMsg('');
      console.log(data);
    } catch (error) {
      setErrorMsg('Email Already Exists');
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short')
      .max(5, 'Too Long')
      .required('This Field is required'),
    email: Yup.string()
      .trim()
      .required('Email is required')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&#]/,
        'Password must contain at least one special character'
      ),
    rePassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="container mt-20">
      <h2 className="text-[1.5rem] text-green-color font-bold my-3 text-center">
        Register Now :
      </h2>

      <form
        className=" mx-auto w-1/2 space-y-11 mb-10"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer"
            placeholder=" "
          />
          {formik.errors.name ? (
            <Alert alertMsg={formik.errors.name}></Alert>
          ) : (
            ''
          )}
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-color peer-focus:dark:text-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer"
            placeholder=" "
          />
          {formik.errors.email && formik.touched.email ? (
            <Alert alertMsg={formik.errors.email}></Alert>
          ) : (
            ''
          )}
          {erroMsg ? <Alert alertMsg={erroMsg}></Alert> : ''}
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-color peer-focus:dark:text-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer"
            placeholder=" "
          />
          {formik.errors.password && formik.touched.password ? (
            <Alert alertMsg={formik.errors.password}></Alert>
          ) : (
            ''
          )}

          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-color peer-focus:dark:text-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer"
            placeholder=" "
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <Alert alertMsg={formik.errors.rePassword}></Alert>
          ) : (
            ''
          )}
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-color peer-focus:dark:text-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer"
            placeholder=" "
          />
          {formik.errors.phone && formik.touched.phone ? (
            <Alert alertMsg={formik.errors.phone}></Alert>
          ) : (
            ''
          )}
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-color peer-focus:dark:text-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-green-color hover:bg-green-color focus:ring-4 focus:outline-none focus:ring-green-color font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-color dark:hover:bg-green-color dark:focus:ring-green-color"
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-10 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-green-color"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'Register'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
