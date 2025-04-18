import React from "react";
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";
const Homeslider = () => {
  const settings = {
    dots: false,
    autoplay: true,
    arrows: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="pb-4  mt-9 ">
      <div className="flex flex-wrap justify-center">
        <div className="w-2/3">
          <div>
            <Slider {...settings}>
              <div>
                <img
                  src="https://img.freepik.com/free-photo/top-view-assortment-vegetables-paper-bag_23-2148853335.jpg?t=st=1733335431~exp=1733339031~hmac=e4100db2e148f9d5f14c382da2e16b3bdc5b88485478294bb0546ac0d3fda32a&w=740"
                  className="w-full h-[400px]"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://img.freepik.com/free-photo/top-view-delicious-porridge-with-raspberries-light-desk_140725-125586.jpg?t=st=1733335708~exp=1733339308~hmac=2793e7719e6429a61ae63a387d70715d434dcb4b8bcc632cd368346374495a9d&w=740"
                  className="w-full h-[400px]"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://img.freepik.com/free-photo/food-cart_1098-14618.jpg?t=st=1733335523~exp=1733339123~hmac=cb3af50a82558caf0b9f36902c48cebcf2207993c8859e92a12afe31cb544d72&w=740"
                  className="w-full h-[400px]"
                  alt=""
                />
              </div>
            </Slider>
          </div>
        </div>
        <div className="w-1/3">
          <div>
            <img
              src="https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448737.jpg?t=st=1733336185~exp=1733339785~hmac=6ed9f340143ad04727b9f5447caa3aca9b90490133bbfb590811726dda730a1c&w=740"
              alt=""
              className="w-full h-[200px]"
            />
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-photo/high-angle-laptop-hard-drive-arrangement_23-2149417022.jpg?t=st=1733336211~exp=1733339811~hmac=0734007ee048606e263abea2a1b8a8c58762f2c5d3859ef00ff084220b15eba1&w=740"
              alt=""
              className="w-full h-[200px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Homeslider;
