import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function CategoriesSlide() {
  let [cats, setCats] = useState([]);

  async function getCat() {
    let { data } = await axios.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
    setCats(data.data);
  }

  useEffect(() => {
    getCat();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="my-12 container">
      <Slider {...settings}>
        {cats.map((ele) => (
          <CatItem key={ele._id} ele={ele}></CatItem>
        ))}
      </Slider>
    </div>
  );
}

function CatItem({ ele }) {
  return (
    <div>
      <img src={ele.image} className="h-[200px] object-cover" alt="" />
    </div>
  );
}
