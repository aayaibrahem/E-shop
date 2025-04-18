import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { fetchProducts } from "../rtk/slices/products-slice";

export default function Productbrand() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.products.data);
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <main className=" w-[80%] mx-auto p-6 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <BeatLoader />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {products?.length > 0 &&
              products
                .filter((product) => product.brand._id === id)
                .map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 rounded-lg shadow bg-gray-50"
                  >
                    <Link to={`${product.id}`}>
                      <img
                        src={product.imageCover}
                        alt=""
                        className="w-full mb-4 rounded-md"
                      />
                      <h1 className="text-lg font-bold">
                        {product.title.slice(0, 20)}
                      </h1>
                      <p>{product.category._id}</p>
                      <p className="text-sm">Price: ${product.price}</p>
                      <p className="text-sm">
                        Rating: {product.ratingsAverage}
                      </p>
                      <p className="text-sm">
                        Category: {product.category.name}
                      </p>
                      <p className="text-sm">Brand: {product.brand.name}</p>
                    </Link>
                  </div>
                ))}
          </div>
        )}
      </main>
    </>
  );
}
