import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategories } from "../rtk/slices/categories-slice";

import Slider from "react-slick";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
const CategorySlier = () => {
  const isLoading = useSelector((state) => state.categories.isLoading);

  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories.data);

  if (!isLoading) {
    console.log(categories);
  }
  useEffect(() => {
    dispatch(fetchcategories());
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="p-5 ">
        {isLoading ? (
          <BeatLoader className="w-20 mx-auto mt-[20%]" />
        ) : (
          <Slider {...settings}>
            {" "}
            {categories?.length > 0 &&
              categories.map((category, idx) => (
                <>
                  <Link to={`/categories/${category._id}`}>
                    <div key={idx} className="mx-2">
                      <img
                        src={category.image}
                        className="w-full h-[150px]"
                        alt=""
                      />
                      <h2 className="text-green-600 text-lg text-center font-bold">
                        {category.name}
                      </h2>
                    </div>
                  </Link>
                </>
              ))}
          </Slider>
        )}
      </section>
    </>
  );
};

export default CategorySlier;
