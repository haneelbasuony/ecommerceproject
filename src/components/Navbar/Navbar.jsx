import React, { useContext, useRef } from 'react';

import logo from '../../assets/images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { userToken } from '../../Context/UserToken';
import { numitem } from '../../Context/NumCartContext';

export default function Navbar() {
  let { numItems } = useContext(numitem);

  let { isLogin, setLogin } = useContext(userToken);
  let navigate = useNavigate();
  let ref = useRef(null);

  function toggleMode() {
    let body = document.body;
    if (ref.current.checked) body.classList.add('dark');
    else body.classList.remove('dark');
  }

  function logout() {
    localStorage.removeItem('token');
    setLogin(null);
    navigate('/');
  }
  return (
    <nav className="bg-light-color border-gray-200 dark:bg-gray-900 w-[100%]">
      <div className="max-w-screen-xl flex flex-wrap justify-between lg:justify-start items-center  mx-auto p-4">
        <Link
          to="/home"
          className="flex items-center  w-[20%] space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="" alt="" />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden  lg:flex lg:justify-between w-[80%] "
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {isLogin ? (
              <li>
                <Link
                  to="/home"
                  className="block py-2 px-3 lg:bg-transparent text-gray-500 lg:hover:text-green-color lg:p-0 dark:text-white lg:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
            ) : (
              ''
            )}
            {isLogin ? (
              <li>
                <Link
                  to="/products"
                  className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-color lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Products
                </Link>
              </li>
            ) : (
              ''
            )}
            {isLogin ? (
              <li>
                <Link
                  to="/categories"
                  className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-color lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Categories
                </Link>
              </li>
            ) : (
              ''
            )}
            {isLogin ? (
              <li>
                <Link
                  to="/brands"
                  className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-color lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Brands
                </Link>
              </li>
            ) : (
              ''
            )}
            {isLogin ? (
              <li>
                <Link
                  to="/wishlist"
                  className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-color lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  WishList
                </Link>
              </li>
            ) : (
              ''
            )}
            {isLogin ? (
              <li>
                <Link
                  to="/cart"
                  className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-color lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Cart
                </Link>
              </li>
            ) : (
              ''
            )}

            {isLogin ? (
              <li>
                <i className="fa-solid fa-shopping-cart text-gray-500 dark:text-white "></i>
                <span className="text-gray-700 dark:text-white ms-2 font-bold ">
                  {numItems}
                </span>
              </li>
            ) : (
              ''
            )}
          </ul>
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {isLogin ? (
              <li onClick={logout}>
                <span
                  href="#"
                  className="cursor-pointer block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-600 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-color lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-color lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#1877F2] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-facebook text-lg"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#cd201f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-youtube text-lg"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#e4405f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
            </li>
            <li>
              <label
                id="toggle"
                className="inline-flex items-center me-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  ref={ref}
                  onChange={toggleMode}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600" />
                <span className="ms-3 text-xl font-medium text-gray-500 dark:text-gray-300">
                  <i className="fa-solid fa-moon"></i>
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
