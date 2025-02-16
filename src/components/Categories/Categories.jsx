import { useState } from 'react';
import useCategories from '../../hooks/useCategories';
import Loading from '../Loading/Loading';
import useSubCategorie from '../../hooks/useSubCategorie';

export default function Categories() {
  let { data, isError, error, isLoading } = useCategories();
  let [slectedCat, setSelectedCat] = useState();
  let { data: subcatData } = useSubCategorie(slectedCat);

  if (isLoading) return <Loading />;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="container">
      <div className="container my-5 flex flex-wrap gap-y-5">
        {data.map((category) => (
          <CategoryItem
            onSelect={() => setSelectedCat(category._id)}
            key={category._id}
            category={category}
          />
        ))}
      </div>
      <div className="container gap-y-5 gap">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-color">
            Sub-Categories
          </h1>
        </div>
        <div className="flex flex-wrap my-10 gap-y-5">
          {subcatData?.map((subcat) => (
            <SubCat key={subcat._id} subcat={subcat}></SubCat>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ category, onSelect }) {
  return (
    <div onClick={onSelect} className="container sm:w-full md:w-1/2 lg:w-1/3">
      <div className="max-w-sm h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 hover:shadow-lg hover:shadow-green-400 cursor-pointer">
        <a href="#">
          <img
            className="rounded-t-lg w-full h-48 object-cover"
            src={category?.image}
            alt=""
          />
        </a>
        <div className="p-5 flex-1 flex flex-col">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {category?.name}
            </h5>
          </a>
        </div>
      </div>
    </div>
  );
}

function SubCat({ subcat }) {
  return (
    <div className="w-1/3">
      <a
        href="#"
        className="hover:shadow-lg hover:shadow-green-400 cursor-pointer block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {subcat?.name}
        </h5>
      </a>
    </div>
  );
}
