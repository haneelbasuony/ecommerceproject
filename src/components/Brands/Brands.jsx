import { useState } from 'react';
import useBrands from '../../hooks/useBrands';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../Loading/Loading';

export default function Brands() {
  const { data, isError, error, isLoading } = useBrands();
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const closeModal = () => {
    setSelectedBrand(null);
  };
  if (isLoading) return <Loading></Loading>;
  return (
    <div className="container my-5 flex flex-wrap gap-y-5">
      {data?.map((brand) => (
        <BrandsItem
          key={brand._id}
          brand={brand}
          onClick={() => handleBrandClick(brand)}
        />
      ))}

      {selectedBrand && (
        <BrandModal brand={selectedBrand} onClose={closeModal} />
      )}
    </div>
  );
}

function BrandsItem({ brand, onClick }) {
  return (
    <div className="container w-1/3" onClick={onClick}>
      <div className="max-w-sm h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 hover:shadow-lg hover:shadow-green-400 cursor-pointer">
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={brand?.image}
          alt=""
        />
        <div className="p-5 flex-1 flex flex-col">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {brand?.name}
          </h5>
        </div>
      </div>
    </div>
  );
}

function BrandModal({ brand, onClose }) {
  return (
    <AnimatePresence>
      {brand && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-green-color">
                {brand.name}
              </h2>
              <button
                onClick={onClose}
                className="py-2 px-4 font-bold text-sm text-gray-900 bg-white rounded-lg border 
                           border-gray-200 hover:bg-gray-100 hover:text-blue-700"
              >
                Close
              </button>
            </div>

            <img
              className="w-full h-48 object-cover rounded-lg mt-4"
              src={brand.image}
            />
            <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">
              {brand.name}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
