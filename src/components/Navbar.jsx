import { useContext, useEffect, useState } from "react";
import Smenu from "./Smenu";
import { Link } from "react-router-dom";
import Auth from "../contextAPI/Auth";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);

  const {isLoggedIn, logout} = useContext(Auth)
  return (
    <>
      <div className="flex w-full justify-between h-14 items-center bg-[#2D2D2D] text-white px-4">
        <div>
          <img
            className="h-10 w-10 inline-block mr-3 rounded-[50%]"
            src="https://www.shutterstock.com/image-vector/coffee-cup-icon-tea-logo-600nw-2478306581.jpg"
            id="logo"
            alt="logo"
          />
          <label className="inline-block" htmlFor="logo">
            CoffeeCraze
          </label>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => {
              setIsMenu(!isMenu);
            }}
          >
            menu
          </button>
        </div>
        <ul className="hidden md:flex gap-3 items-center ">
          <Link to="/">
            {" "}
            <li>Home</li>
          </Link>
          <Link to="/shop">
            <li>Shop</li>
          </Link>
          <Link to="/cart">
            <li>Cart</li>
          </Link>
          <Link to="/checkout">
            <li>Checkout</li>
          </Link>
          {isLoggedIn ? (
            <div className="w-10 h-10 rounded-full">
              <img
              onClick={logout}
                className="w-10 h-10 rounded-full object-cover object-top"
                src="/profile.jpg"
                alt="profile"
              />
            </div>
          ) : (
            <div>
              <Link to="/login">
                <li>Login</li>
              </Link>
            </div>
          )}
        </ul>
      </div>
      {isMenu && <Smenu />}
    </>
  );
};
export default Navbar;
