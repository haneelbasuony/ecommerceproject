import React from 'react';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import Header from './Header/Header';
import CategoriesSlide from './CategoriesSlide/CategoriesSlide';

export default function Home() {
  return (
    <div className="dark:bg-[#15202E]">
      <Header></Header>
      <CategoriesSlide></CategoriesSlide>
      <FeaturedProducts />
    </div>
  );
}
