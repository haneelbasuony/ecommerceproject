import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ProductItem from '../Home/FeaturedProducts/ProductItem/ProductItem';
import useMutationCart, { addToCart } from '../../hooks/useMutationCart';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

export default function ProductDetails() {
  let [imgSrc, setImgSrc] = useState('');
  let [ind, setIndex] = useState(0);
  let { id, catId } = useParams();
  let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart);
  if (isSuccess) toast.success(data?.data?.message);
  if (isError) toast.error(error?.response?.data?.message);

  function changeImgSource(e) {
    setIndex(e?.target?.getAttribute('index'));
    setImgSrc(e?.target?.src);
  }
  async function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data: dataobj, isLoading: detailsLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: getProductDetails,
    select: (dataobj) => dataobj?.data?.data,
  });

  async function getRelatedProducts() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
    );
  }

  let { data: relatedobj, isLoading: relatedLoading } = useQuery({
    queryKey: ['relatedProducts', catId],
    queryFn: getRelatedProducts,
    select: (relatedobj) => relatedobj?.data?.data,
  });

  useEffect(() => {
    changeImgSource();
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  console.log(detailsLoading);
  return (
    <>
      <div className="container mt-12 ">
        {!detailsLoading ? (
          <div className="flex flex-col md:flex-row gap-5">
            <div className=" md:w-1/3">
              <img
                src={imgSrc ? imgSrc : dataobj?.imageCover}
                className="w-full"
                alt=""
              />
              <div className="flex justify-center align-middle mt-5 gap-5 ">
                {dataobj?.images?.map((img, index) => (
                  <img
                    index={index}
                    src={img}
                    onClick={changeImgSource}
                    key={img}
                    className={`w-[20%] hover:scale-125 cursor-pointer ease-in-out duration-300
                        ${index == ind ? 'border-4 border-green-color' : ''}`}
                  />
                ))}
              </div>
            </div>
            <div className=" md:w-2/3 flex flex-col gap-10 align-middle justify-center">
              <h2 className="text-[2rem] font-bold my-4">{dataobj?.title}</h2>
              <p className="text-lg text-gray-500">{dataobj?.description}</p>
              <h3 className="font-semibold text-lg">
                {dataobj?.category?.name}
              </h3>
              <div className="flex justify-between">
                <span className="text-lg font-bold">{dataobj?.price} EGP</span>
                <span className="text-lg font-bold text-gray-500">
                  {dataobj?.ratingsAverage}
                  <i className="fa-solid fa-star text-rating-color "></i>
                </span>
              </div>
              <button
                onClick={() => mutate(dataobj?._id)}
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
              >
                + Add to cart <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        ) : (
          <Loading></Loading>
        )}

        <h2 className="text-2xl mt-10 font-bold">Realted Products :</h2>
        <div className="flex flex-wrap">
          {relatedobj?.length ? (
            relatedobj.map((prod) => (
              <ProductItem prod={prod} key={prod._id}></ProductItem>
            ))
          ) : (
            <Loading></Loading>
          )}
        </div>
      </div>
    </>
  );
}
