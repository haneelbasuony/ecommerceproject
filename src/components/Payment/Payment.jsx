import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { paymentOnline } from '../../Apis/payment';
import { useFormik } from 'formik';

export default function Payment() {
  const location = useLocation();
  const { cartId } = location.state || {};

  let { mutate, data } = useMutation({ mutationFn: paymentOnline });

  function handlePayment(shippingAddress) {
    mutate({ cartId, shippingAddress });
  }
  if (data?.data?.status === 'success')
    window.location.href = data?.data?.session?.url;
  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    onSubmit: handlePayment,
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="my-4 text-2xl font-bold text-center">Payment</h2>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Details
            </label>
            <input
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
              required
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              City
            </label>
            <input
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
              required
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
              required
            />
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
