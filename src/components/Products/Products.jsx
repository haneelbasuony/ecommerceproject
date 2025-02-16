import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import ProductItem from '../Home/FeaturedProducts/ProductItem/ProductItem';
import useProducts from '../../hooks/useProducts';

export default function Products() {
  let { data, isError, error, isLoading } = useProducts();
  const [search, setSearch] = useState('');
  const filteredProducts = data?.filter((prod) =>
    prod?.title?.toLowerCase().includes(search.toLowerCase())
  );
  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4 mt-5"
      />

      <div className="flex flex-wrap">
        {filteredProducts.length ? (
          filteredProducts.map((prod) => (
            <ProductItem key={prod._id} prod={prod} />
          ))
        ) : (
          <h2>No products found</h2>
        )}
      </div>
    </div>
  );
}
