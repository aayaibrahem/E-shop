import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FaHeart, FaRegHeart, FaShoppingCart, FaUser } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { authContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getuserCart } from "../rtk/slices/cart-slice";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const { data: cart, numOfItems } = useSelector((state) => state.cart);
  const { data: wishlist, items } = useSelector((state) => state.wishlist);
  const { setToken, token } = useContext(authContext);
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();
  const handleClick = (linkId) => {
    setActiveLink(linkId);
  };
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/");
  }
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-4 bg-green-500 shadow-md overflow-hidden">
      <div className=" px-4 mx-auto  ">
        <div className="flex justify-between items-center">
          <div className="flex items-center lg:w-1/3 w-1/2 ">
            <Link to="/" className="text-white font-bold text-xl">
              Everything-shop
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-center ">
            {token ? (
              <>
                <ul className="flex  items-center justify-center space-x-10 mt-2">
                  <Link
                    onClick={() => handleClick(1)}
                    className={`text-white nav-link hover:underline ${
                      activeLink === 1 ? "text-yellow-200" : ""
                    }`}
                    to="/home"
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    onClick={() => handleClick(4)}
                    className={`text-white nav-link hover:underline ${
                      activeLink === 4 ? "text-yellow-200" : ""
                    }`}
                    to="/categories"
                  >
                    <li>Categories</li>
                  </Link>
                  <Link
                    to="/brands"
                    onClick={() => handleClick(2)}
                    className={`text-white nav-link hover:underline ${
                      activeLink === 2 ? "text-yellow-200" : ""
                    }`}
                  >
                    <li>Brands</li>
                  </Link>
                  <Link
                    onClick={() => handleClick(3)}
                    className={`text-white nav-link hover:underline ${
                      activeLink === 3 ? "text-yellow-200" : ""
                    }`}
                    to="/products"
                  >
                    <li>Products</li>
                  </Link>
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="hidden lg:flex space-x-4 w-1/3 items-center justify-end ">
            {token ? (
              <>
                <Link className="relative" to="/wishlist">
                  <FaRegHeart className="cursor-pointer text-white text-xl " />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {items}
                  </div>
                </Link>
                <Link className="relative" to="/cart">
                  <FaShoppingCart className="cursor-pointer text-xl text-white" />{" "}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {numOfItems}
                  </div>
                </Link>
                <div>
                  <FaUser className="cursor-pointer text-xl text-white" />
                </div>
                <button
                  onClick={logout}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="text-white flex space-x-3">
                  <Link to="/" className="hover:text-yellow-100">
                    Log in{" "}
                  </Link>{" "}
                  <div>|</div>
                  <Link to="/signup" className="hover:text-yellow-100">
                    Sign up{" "}
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="lg:hidden md:flex flex-col align-top justify-end">
            <button>
              {mobileDrawerOpen ? (
                <>
                  <div className="">
                    <div className="flex space-x-4 items-center justify-center mt-6">
                      <div className="relative">
                        <FaRegHeart className="cursor-pointer text-white text-xl " />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          2
                        </div>
                      </div>
                      <div className="relative">
                        <FaShoppingCart className="cursor-pointer text-xl text-white" />{" "}
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          3
                        </div>
                      </div>
                      <div>
                        <FaUser className="cursor-pointer text-xl text-white" />
                      </div>
                      <IoMdClose
                        onClick={toggleNavbar}
                        className="text-2xl text-white font-extrabold transition-transform duration-300 transform hover:scale-110 cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex space-x-4 items-center justify-center mt-6">
                    <div className="relative">
                      <FaRegHeart className="cursor-pointer text-white text-xl " />
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        2
                      </div>
                    </div>
                    <div className="relative">
                      <FaShoppingCart className="cursor-pointer text-xl text-white" />{" "}
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        3
                      </div>
                    </div>
                    <div>
                      <FaUser className="cursor-pointer text-xl text-white" />
                    </div>{" "}
                    <CiMenuFries className="text-white text-2xl transition-transform duration-300 transform hover:scale-110 cursor-pointer" />
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <>
            <div className="fixed overflow-hidden right-0 z-20 bg-green-500 w-full py-4  flex flex-col  px-7  ">
              {token ? (
                <>
                  <ul className="">
                    <Link
                      onClick={() => handleClick(1)}
                      className={`text-white nav-link hover:underline ${
                        activeLink === 1 ? "text-yellow-200" : ""
                      }`}
                      to="/home"
                    >
                      <li>Home</li>
                    </Link>
                    <Link
                      onClick={() => handleClick(4)}
                      className={`text-white nav-link hover:underline ${
                        activeLink === 4 ? "text-yellow-200" : ""
                      }`}
                      to="/categories"
                    >
                      <li>Categories</li>
                    </Link>
                    <Link
                      to="/brands"
                      onClick={() => handleClick(2)}
                      className={`text-white nav-link hover:underline ${
                        activeLink === 2 ? "text-yellow-200" : ""
                      }`}
                    >
                      <li>Brands</li>
                    </Link>
                    <Link
                      onClick={() => handleClick(3)}
                      className={`text-white nav-link hover:underline ${
                        activeLink === 3 ? "text-yellow-200" : ""
                      }`}
                      to="/products"
                    >
                      <li>Products</li>
                    </Link>
                  </ul>
                </>
              ) : (
                ""
              )}{" "}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
