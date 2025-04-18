import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/products-slice";
import Homeslider from "../components/Homeslider";
import CategorySlier from "../components/CategorySlier";

export default function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <div className="w-[90%] mx-auto">
        <Homeslider />
        <CategorySlier />
      </div>
    </>
  );
}
