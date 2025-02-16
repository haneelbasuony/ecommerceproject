import React, { useContext } from 'react';
import useQueryCart, { getCart } from '../../hooks/useQueryCart';
import Loading from '../Loading/Loading';
import useMutationCart, {
  clearCart,
  deletItem,
  updateCount,
} from '../../hooks/useMutationCart';
import empty from '../../assets/images/empty.png';
import { useNavigate } from 'react-router-dom';
import { numitem } from '../../Context/NumCartContext';

export default function Cart() {
  let { setNumItems } = useContext(numitem);
  const navigate = useNavigate();
  let { data, isError, error, isLoading } = useQueryCart(getCart);

  let { mutate: mutateDelete, isPending: deletPending } =
    useMutationCart(deletItem);
  let { mutate: mutateClear, isPending: clearPending } =
    useMutationCart(clearCart);
  let { mutate: mutateCount, isPending: countPending } =
    useMutationCart(updateCount);

  let { cartId } = data?.data || {};
  console.log(cartId);

  const gotoPayment = () => {
    navigate('/payment', { state: { cartId } });
  };
  setNumItems(data?.data?.numOfCartItems);
  if (isLoading || clearPending || deletPending || countPending)
    return <Loading></Loading>;
  if (!data?.data?.numOfCartItems) {
    return (
      <div className="flex flex-wrap flex-col justify-center items-center h-screen">
        <h1 className="text-green-color text-4xl font-bold my-10">
          Cart Shop Empty
        </h1>
        <img src={empty} alt="" />
      </div>
    );
  }

  return (
    <div className=" w-3/4 mx-auto  relative sm:rounded-lg">
      <h1 className="text-green-color text-4xl font-bold my-10">Cart Shop</h1>
      <h2 className="font-bold text-3xl  my-10">
        <span className="text-green-color"> Number Of Cart Items: </span>
        <span className="text-red-600">{data?.data?.numOfCartItems}</span>
      </h2>
      <h2 className="font-bold text-3xl text-green-color my-10 flex items-center space-x-2">
        <span>Total Cart Price:</span>
        <span className="text-red-600">{data?.data?.data?.totalCartPrice}</span>
        <span className="text-black">EGP</span>
      </h2>

      <table className="w-full shadow-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="">
          {data?.data?.data?.products.map((prod) => (
            <tr
              key={prod?.product?._id}
              className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={prod?.product?.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="Apple Watch"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.product?.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      mutateCount({
                        productId: prod?.product?._id,
                        count: prod?.count - 1,
                      });
                    }}
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <input
                      type="number"
                      id="first_product"
                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={prod?.count}
                      required
                    />
                  </div>
                  <button
                    onClick={() => {
                      mutateCount({
                        productId: prod?.product?._id,
                        count: prod?.count + 1,
                      });
                    }}
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.price}
                <span className="text-green-color"> EGP</span>
              </td>
              <td className="px-6 py-4 ">
                <a
                  onClick={() => {
                    mutateDelete(prod?.product?._id);
                  }}
                  className="font-medium text-white-600 dark:text-red-500 hover:text-white bg-red-400 px-3 py-4 rounded cursor-pointer "
                >
                  <span className="sm:hidden xl:inline-block">Remove</span>
                  <i className="fa-solid fa-trash"> </i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mx-auto justify-between mt-10">
        <button
          type="button"
          onClick={mutateClear}
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Clear Cart
        </button>
        <button
          type="button"
          onClick={gotoPayment}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-grgreen-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
        >
          Cash Out
        </button>
      </div>
    </div>
  );
}
