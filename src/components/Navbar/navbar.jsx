import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { NameContext } from "../context/NameContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function Navbar() {
  let { cartCount, setTokenStatus, tokenStatus } = useContext(CartContext);
  let { wishlistCount } = useContext(WishlistContext);
  let { userData, setUserData } = useContext(NameContext);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <nav className="py-5 z-50 bg-gray-100 capitalize text-black md:fixed md:top-0 md:end-0 md:start-0">
  <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center px-3 md:space-x-2">
    {/* Logo Section */}
    <div className="logo">
      <img src={logo} className="w-36" alt="logo" />
    </div>

    {/* Hamburger Menu for Mobile */}
    <div
      onClick={() => setOpen(!open)}
      className="icon md:hidden cursor-pointer"
    >
      <i className="fa-solid fa-bars"></i>
    </div>

    {/* Main Navigation Links */}
    <div
      className={` ${open ? "flex" : "hidden"} md:flex flex-col md:flex-row justify-between items-center basis-full`}
    >
      <div className="hidden md:block"></div>

      <div className="flex flex-col absolute my-6 md:my-2 md:static md:flex-row items-center md:space-x-2">
        {userData && (
          <ul className="flex flex-col gap-4 md:flex-row md:gap-2 justify-center items-center md:space-x-2">
            <li>
              <NavLink onClick={() => setOpen(false)} to="">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setOpen(false)} to="products">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setOpen(false)} to="categories">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setOpen(false)} to="brands">
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setOpen(false)} to="wishlist">
                Wish List
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* Right Section: Cart & Logout */}
      <ul className="flex flex-col mt-56 md:mt-2 md:flex-row gap-2 justify-center items-center md:space-x-2">
        {userData ? (
          <>
            <li>
              <NavLink onClick={() => setOpen(false)} to="cart">
                <i className="fa-solid fa-xl fa-cart-shopping relative text-gray-500 hover:text-gray-800 mt-6 md:mt-0">
                  <span
                    className="absolute -top-[25px] bg-green-500 rounded-lg w-5 h-5 text-center p-1 left-6 -translate-x-1/2 text-xs text-white"
                  >
                    {tokenStatus && cartCount ? cartCount : 0}
                  </span>
                </i>
              </NavLink>
            </li>
            <li>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  localStorage.removeItem("userToken");
                  setUserData(null);
                  navigate("login");
                  setTokenStatus(false);
                }}
              >
                Logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink onClick={() => setOpen(false)} to="login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setOpen(false)} to="register">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

    </>
  );
}
