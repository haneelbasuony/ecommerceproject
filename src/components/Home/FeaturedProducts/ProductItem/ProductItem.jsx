import React from 'react';
import { Link } from 'react-router-dom';
import useMutationCart, { addToCart } from '../../../../hooks/useMutationCart';
import toast from 'react-hot-toast';
import useMutationWishList, {
  addToWishList,
} from '../../../../hooks/useMutationWishList';
import useGetWishList from '../../../../hooks/useGetWishList';

export default function ProductItem({ prod }) {
  let {
    imageCover,
    title,
    price,
    category,
    ratingsAverage,
    priceAfterDiscount,
    id,
  } = prod;

  let {
    data,
    mutate: mutateAddToCart,
    error,
    isError,
    isSuccess: addToCartSucess,
  } = useMutationCart(addToCart);

  let {
    data: addToWishListData,
    mutate: mutateAddToWishList,
    isSuccess: addToWishListSucess,
  } = useMutationWishList(addToWishList);

  let { data: wishlist } = useGetWishList();
  console.log(wishlist);

  if (addToCartSucess) toast.success(data?.data?.message);
  if (addToWishListSucess) toast.success(addToWishListData?.data?.message);
  if (isError) toast.error(error?.response?.data?.message);
  return (
    <div className="cursor-pointer sm:w-1/2 md:w-1/4 xl:w-1/6 p-4  ">
      <div className="product group p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidde">
        <Link to={`/productDetails/${id}/${category._id}`}>
          <div className="overflow-hidden">
            <img
              src={imageCover}
              className="w-full transform transition-transform duration-300 group-hover:scale-110 "
              alt="Product"
            />
          </div>

          <p className="text-green-color text-sm font-bold">{category.name}</p>
          <p>{title}</p>
          <div className="flex justify-between my-3">
            <div>
              <p
                className={
                  priceAfterDiscount ? 'line-through text-red-800' : ''
                }
              >
                {price} EGP
              </p>
              <p>{priceAfterDiscount ? priceAfterDiscount + `EGP` : ''} </p>
            </div>
            <span className="text-gray-500">
              {ratingsAverage}
              <i className="fa-solid fa-star text-rating-color"></i>
            </span>
          </div>
        </Link>
        <div className="flex justify-between">
          <button
            onClick={() => {
              mutateAddToCart(id);
            }}
            type="button"
            className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <i
            onClick={() => mutateAddToWishList(id)}
            className={`fa-solid fa-heart text-3xl text-center ${
              wishlist?.some((item) => item.id === id)
                ? 'text-red-600'
                : 'text-gray-400'
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
}
