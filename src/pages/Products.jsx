import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/products-slice";
import { BeatLoader, ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { addToCart } from "../rtk/slices/cart-slice";

export default function Products() {
  const dispatch = useDispatch();
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { data: products } = useSelector((state) => state.products.data);

  // const { data: cart } = useSelector((state) => state.cart);
  const isLoading = useSelector((state) => state.products.isLoading);

  const handleAddToCart = (productId) => {
    setLoadingProductId(productId);
    dispatch(addToCart(productId)).finally(() => setLoadingProductId(null));
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/6 h-screen bg-gray-200 fixed">
        <div className="p-4">
          <h1 className="text-lg font-semibold">Sidebar</h1>
          <ul className="mt-4 space-y-2">
            <li className="hover:text-blue-500 cursor-pointer">Link 1</li>
            <li className="hover:text-blue-500 cursor-pointer">Link 2</li>
            <li className="hover:text-blue-500 cursor-pointer">Link 3</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[16.666%] w-full p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <BeatLoader />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {products?.length > 0 &&
              products.map((product) => (
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
                    <p className="text-green-600  ">{product.brand.name}</p>
                    <h2 className="text-2xl mb-3  font-semibold">
                      {product.title.slice(0, 20)}
                    </h2>

                    <p className="text-sm">Rating: {product.ratingsAverage}</p>

                    <p className="text-sm">Price: ${product.price}</p>
                    <p className="text-lg  mb-3 text-green-700 font-mono">
                      {product.category.name}
                    </p>
                  </Link>
                  <button
                    onClick={() => {
                      handleAddToCart(product.id);
                    }}
                    className="flex-1 w-full px-4 py-2 rounded-md bg-green-600 text-white"
                  >
                    {loadingProductId == product.id ? (
                      <ClipLoader color="#ffffff" size="20" />
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
