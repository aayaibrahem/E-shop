import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import "react-bootstrap/dist/react-bootstrap";
import "animate.css";
// Import Swiper styles
import "swiper/css";
import Products from "./pages/Products";
import Productscategory from "./pages/Productscategory";
import Productbrand from "./pages/Productbrand";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClientProvider } from "react-query";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { getuserCart } from "./rtk/slices/cart-slice";
import { useEffect } from "react";
import Wishlist from "./pages/Wishlist";
import { getuserWishlist } from "./rtk/slices/wishlist-slice";

function App() {
  const dispatch = useDispatch();
  const { data: cart, numOfItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getuserCart());
    dispatch(getuserWishlist());
  }, []);
  return (
    <>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:id"
            element={
              <ProtectedRoute>
                <Productscategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:id/:pro"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/brands"
            element={
              <ProtectedRoute>
                <Brands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brands/:id"
            element={
              <ProtectedRoute>
                <Productbrand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brands/:id/:pro"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:pro"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
