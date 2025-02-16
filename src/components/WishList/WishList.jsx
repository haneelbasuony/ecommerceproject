import React from 'react';
import useGetWishList from '../../hooks/useGetWishList';
import { data } from 'react-router-dom';
import useMutationCart, { addToCart } from '../../hooks/useMutationCart';
import useMutationWishList, {
  deleteFromWishList,
} from '../../hooks/useMutationWishList';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import empty from '../../assets/images/empty.png';

export default function Wishlist() {
  let { data: wishlist, isLoading } = useGetWishList();
  if (isLoading) <Loading></Loading>;
  if (wishlist?.length === 0) {
    return (
      <div className="flex flex-wrap flex-col justify-center items-center h-screen">
        <h1 className="text-green-color text-4xl font-bold my-10">
          WishList Empty
        </h1>
        <img src={empty} alt="" />
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="text-green-color font-bold text-3xl my-10">My WishList</h1>
      <div className="flex flex-wrap gap-y-4">
        {wishlist?.map((ele) => (
          <WishListItem key={ele.id} ele={ele}></WishListItem>
        ))}
      </div>
    </div>
  );
}

function WishListItem({ ele }) {
  let {
    data: addToCartData,
    mutate: mutateAddToCart,
    isSuccess: addToCartSucess,
  } = useMutationCart(addToCart);

  let {
    data: deleteWishListData,
    mutate: mutateDeleteFromWishlist,
    isSuccess: deleFromWishListSucess,
  } = useMutationWishList(deleteFromWishList);
  if (deleFromWishListSucess) toast.success(deleteWishListData?.data?.message);
  return (
    <div className="w-1/4  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg w-48" src={ele?.imageCover} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ele?.title}
          </h5>
        </a>
        <p className="mb-3 font-bold text-green-color">{ele?.price} EGP</p>
        <button
          type="button"
          onClick={() => {
            mutateAddToCart(ele?.id);
            mutateDeleteFromWishlist(ele?.id);
          }}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add To Cart
        </button>
        <button
          onClick={() => {
            mutateDeleteFromWishlist(ele?.id);
          }}
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
