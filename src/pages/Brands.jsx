import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../rtk/slices/brand-slice";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Brands() {
  const dispatch = useDispatch();
  const { data: brands } = useSelector((state) => state.brands.data);
  const isLoading = useSelector((state) => state.brands.isLoading);
  console.log(isLoading);
  if (!isLoading) {
    console.log(brands);
  }
  useEffect(() => {
    dispatch(fetchBrands());
  }, []);
  console.log(brands);
  return (
    <>
      <div className="">
        {isLoading ? (
          <BeatLoader className="w-20 mx-auto mt-[20%]" />
        ) : (
          <div className="w-[80%] mx-auto gap-6 my-10 grid grid-cols-4">
            {brands?.length > 0 &&
              brands.map((brand) => (
                <>
                  <div className="text-center font-bold " key={brand._id}>
                    <Link to={`/brands/${brand._id}`}>
                      <img
                        src={brand.image}
                        alt=""
                        className="  h-[300px] rounded "
                      />

                      <div className="mt-3 text-xl text-blue-800">
                        {brand.name}
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
