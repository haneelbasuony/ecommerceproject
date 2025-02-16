import React from 'react';
import Slider from 'react-slick';
import img1 from '../../../assets/images/slider-image-1.jpeg';
import img2 from '../../../assets/images/slider-image-2.jpeg';
import img3 from '../../../assets/images/slider-image-3.jpeg';
import blog1 from '../../../assets/images/blog-img-1.jpeg';
import blog2 from '../../../assets/images/blog-img-2.jpeg';

export default function Header() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    customPaging: () => (
      <div className="w-[30px] h-[8px] rounded bg-gray-500 p-[5px] my-[10px] hover:bg-gray-700 hover:scale-110 transition-all duration-300"></div>
    ),
    dotsClass: 'slick-dots !flex justify-center gap-[20px]',
  };

  return (
    <header className="my-10">
      <div className="container flex flex-wrap">
        <div className="w-full md:w-2/3  md:mb-0">
          <Slider {...settings}>
            <img src={img1} className="h-[500px] object-cover" alt="" />
            <img src={img2} className="h-[500px] object-cover" alt="" />
            <img src={img3} className="h-[500px] object-cover" alt="" />
          </Slider>
        </div>
        <div className="w-full md:w-1/3">
          <img src={blog1} className="h-[250px] object-cover" alt="" />
          <img src={blog2} className="h-[250px] object-cover" alt="" />
        </div>
      </div>
    </header>
  );
}
