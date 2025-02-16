import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem/ProductItem';
import Loading from '../../Loading/Loading';
import ErrorMsg from '../../ErrorMsg/ErrorMsg';
import useProducts from '../../../hooks/useProducts';

export default function FeaturedProducts() {
  let { data, isError, error, isLoading } = useProducts();
  const [search, setSearch] = useState('');

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;
  const filteredProducts = data?.filter((prod) =>
    prod?.title?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="flex flex-wrap">
        {filteredProducts.length ? (
          filteredProducts.map((prod) => (
            <ProductItem prod={prod} key={prod._id} />
          ))
        ) : (
          <h2>No products found</h2>
        )}
      </div>
    </div>
  );
}
