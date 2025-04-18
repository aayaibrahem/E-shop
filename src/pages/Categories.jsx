import React, { useEffect } from "react";
import { fetchcategories } from "../rtk/slices/categories-slice";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader, PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Categories() {
  const isLoading = useSelector((state) => state.categories.isLoading);

  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories.data);

  if (!isLoading) {
    console.log(categories);
  }
  useEffect(() => {
    dispatch(fetchcategories());
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <BeatLoader className="w-20 mx-auto mt-[20%]" />
      ) : (
        <div className="w-[80%] mx-auto gap-6 my-10 grid grid-cols-3">
          {categories?.length > 0 &&
            categories.map((category) => (
              <>
                <div className="text-center font-bold ">
                  <Link to={`/categories/${category._id}`}>
                    <img
                      src={category.image}
                      alt=""
                      className="w-[300px] object-cover h-[300px] rounded "
                    />

                    <div className="mt-3 text-xl text-blue-800">
                      {category.name}
                    </div>
                  </Link>
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
}
