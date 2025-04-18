import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../rtk/slices/products-slice";
import { BeatLoader, ClipLoader } from "react-spinners";
import { addToCart } from "../rtk/slices/cart-slice";
import { FaRegHeart } from "react-icons/fa";
import { toggleWishlist } from "../rtk/slices/wishlist-slice";

export default function ProductDetails() {
  const { pro } = useParams();
  const dispatch = useDispatch();
  const { data: cart } = useSelector((state) => state.cart);
  const { data: wishlist } = useSelector((state) => state.wishlist);
  const { data: products } = useSelector((state) => state.products.data);
  const isLoading = useSelector((state) => state.products.isLoading);
  const processisloading = useSelector((state) => state.cart.processisloading);
  // // Local state for wishlist toggle
  // const isInWishlist = wishlist?.includes(product?.id);
  // const [isAdded, setIsAdded] = useState(isInWishlist);

  // // Toggle wishlist state
  // const handleWishlistToggle = () => {
  //   dispatch(addtoWishlist(product.id)); // Dispatch Redux action
  //   setIsAdded((prev) => !prev); // Optimistic UI update
  // };

  // // Sync local `isAdded` state with Redux wishlist changes
  // useEffect(() => {
  //   setIsAdded(isInWishlist);
  // }, [isInWishlist]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <div>
        <main className=" w-[80%] mx-auto p-6 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <BeatLoader />
            </div>
          ) : (
            <div className="">
              {products?.length > 0 &&
                products
                  .filter((product) => product.id === pro)
                  .map((product) => (
                    <div
                      key={product.id}
                      className=" w-full md:w-[80%] mx-auto flex  justify-center items-center  gap-7 "
                    >
                      <div className="md:w-1/3 w-full">
                        <img
                          src={product.imageCover}
                          alt=""
                          className="w-full mb-4 border p-4 rounded-lg shadow "
                        />
                      </div>
                      <div className="md:w-2/3 w-full">
                        <p className="text-green-600  ">{product.brand.name}</p>
                        <h2 className="text-2xl mb-3  font-semibold">
                          {product.title.slice(0, 20)}
                        </h2>
                        <p className="text-lg mb-3 ">{product.description}</p>
                        <p className="text-sm">
                          Rating: {product.ratingsAverage}
                        </p>

                        <p className="text-sm">Price: ${product.price}</p>
                        <p className="text-lg  mb-3 text-green-700 font-mono">
                          {product.category.name}
                        </p>
                        <div className="flex items-center gap-3 ">
                          <button
                            onClick={() => {
                              dispatch(addToCart(product.id));
                            }}
                            className=" px-4 py-2 rounded-md bg-green-600 text-white"
                          >
                            {processisloading ? (
                              <ClipLoader color="#ffffff" size="20" />
                            ) : (
                              "Add to Cart"
                            )}
                          </button>
                          <button
                            onClick={() => {
                              dispatch(toggleWishlist(product.id));
                            }}
                            className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
                          >
                            {/* {isAdded ? (
                              <FaHeart className="text-2xl text-red-600" />
                            ) : (
                              <FaRegHeart className="text-2xl text-green-600" />
                            )} */}
                            <FaRegHeart className="text-2xl text-green-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
