import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Auth from "../contextAPI/Auth";
import { useContext } from "react";

const Navbar = () => {
  const { isLoggedIn, userRole } = useContext(Auth);
  const navgiate = useNavigate();
  return (
    <motion.div
      className="absolute z-10 left-1/2 top-4 transform -translate-x-1/2 w-11/12 md:w-1/2 bg-white rounded-full shadow-md md:shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <ul className="flex justify-center md:justify-center gap-4 md:gap-9 px-4 md:px-0 py-3 md:py-4 text-sm md:text-base">
        <li
          className="hover:text-gray-600 transition-colors"
          onClick={() => navgiate("/")}
        >
          Home
        </li>
        <li
          className="hover:text-gray-600 transition-colors"
          onClick={() => navgiate("/collection")}
        >
          Shop
        </li>
        <li
          className="hover:text-gray-600 transition-colors"
          onClick={() => navgiate("/aboutus")}
        >
          About us
        </li>
        <li
          className="hover:text-gray-600 transition-colors"
          onClick={() => navgiate("/c")}
        >
          Cart
        </li>
        {!isLoggedIn ? (
          <li
            className="hover:text-gray-600 transition-colors"
            onClick={() => navgiate("/login")}
          >
            Signin
          </li>
        ) : userRole === "admin" ? (
          <li
            className="hover:text-gray-600 transition-colors"
            onClick={() => navgiate("/adminprofile")}
          >
            Profile
          </li>
        ) : (
          <li
            className="hover:text-gray-600 transition-colors"
            onClick={() => navgiate("/account")}
          >
            Profile
          </li>
        )}
        {userRole === "admin" && (
          <li
            className="hover:text-gray-600 transition-colors"
            onClick={() => navgiate("/dashbord")}
          >
            upload
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default Navbar;
