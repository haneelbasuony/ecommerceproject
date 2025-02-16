import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-300  shadow dark:bg-gray-900  py-10 ">
      <div className="container">
        <h2 className="text-3xl">Get The FreshCart app</h2>
        <h4 className="text-2xl font-light text-gray-900 mt-5">
          We will send you a link, open it on your phone to download app
        </h4>

        <form>
          <label
            htmlFor="Email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="Email"
              id="Email"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Email"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Share App Link
            </button>
          </div>
        </form>
        <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700" />
        <div className="flex justify-between">
          <div className="flex gap-4 text-2xl items-center">
            <h4>Payment Partners</h4>
            <i className="fa-brands fa-amazon-pay text-[#FF9900]"></i>

            <i className="fa-solid fa-truck-fast text-gray-600"></i>

            <i className="fa-brands fa-cc-mastercard text-[#EB001B]"></i>

            <i className="fa-brands fa-cc-paypal text-[#003087]"></i>
          </div>

          <div className="flex gap-4 text-2xl items-center">
            <h4>Get deliveries with FreshCart</h4>
            <i className="fa-brands fa-app-store-ios text-[#007AFF]"></i>

            <i className="fa-brands fa-google-play text-[#34A853]"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
