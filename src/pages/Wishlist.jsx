import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserWishlist } from "../rtk/slices/wishlist-slice";
import { ClipLoader } from "react-spinners";
// import { Button } from "flowbite-react";
// import { DeleteIcon } from "lucide-react";

// import { deleteProduct } from "../rtk/slices/cart-slice";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, wishlistproducts, isloadinng, processisloading } = useSelector(
    (state) => state.wishlist
  );
  const [loadingProductId, setLoadingProductId] = useState(null); // state for tracking which product is loading

  useEffect(() => {
    dispatch(getuserWishlist());
  }, [dispatch]);
  //   console.log(wishlistproducts);
  const handleDelete = (productId) => {
    setLoadingProductId(productId); // Set the loading state for the product being deleted
    dispatch(deleteProduct(productId)).finally(() => {
      setLoadingProductId(null); // Reset the loading state after deletion
    });
  };

  return (
    <>
      <section className="py-8">
        <div className="w-full md:w-[80%] mx-auto bg-slate-200 p-5 rounded-md">
          {isloadinng ? (
            <div className="flex justify-center items-center py-10">
              <ClipLoader color="#008000" size={40} />
            </div>
          ) : items === 0 ? (
            <p className="text-center text-2xl font-bold text-green-600">
              Your Wishlist is empty!
            </p>
          ) : (
            <>
              {items > 0 && (
                <div>
                  <button
                    //   onClick={() => {
                    //     dispatch(deleteCart());
                    //   }}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Clear Wishlist
                  </button>
                </div>
              )}
              {wishlistproducts.map((product, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap justify-center items-center mb-4 bg-slate-100 mt-5 rounded animate__animated animate__fadeIn"
                >
                  <div className="w-1/6 p-5">
                    <img
                      src={product.imageCover}
                      className="w-full h-[150px] object-cover"
                    />
                  </div>
                  <div className="w-4/6 p-5">
                    <h2 className="mb-3 text-xl">
                      {product?.title?.slice(0, 24)}
                    </h2>
                    <h2 className="mb-3 text-xl text-green-600">
                      {product.price.toFixed(2)} EGP
                    </h2>
                    {loadingProductId === product._id ? (
                      <ClipLoader color="#FF0000" size={20} />
                    ) : (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        // onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;
