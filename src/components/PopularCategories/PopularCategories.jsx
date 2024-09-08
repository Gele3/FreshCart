import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function PopularCategories() {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategories(data.data);
  }
  function searchProducts(value) {
    if (value) {
      setSearch(
        products.filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSearch(products)
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
     <form className="mx-auto md:w-1/2 mb-4 px-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => searchProducts(e.target.value)}
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 focus:outline-none "
                placeholder="Search products"
              />
            </div>
          </form>
      <Slider {...settings} className="px-1">
        {categories.map((category) => (
          <div key={category._id} className="focus:outline-none">
            <img
              loading="lazy"
              src={category.image}
              className="h-[300px] w-full"
              alt={category}
            />
            <p className="text-lg">{category.name}</p>
          </div>
        ))}
      </Slider>
    </>
  );
}
