import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from "../utils/constant";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from "../redux/movieSlice";
import Logo from "../../Assets/Logo.png";
const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      }

      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

  return (
    <header className="fixed top-0 left-0 z-[9999] flex h-20 w-full items-center justify-between bg-gradient-to-b from-black/90 to-transparent px-6">

      {/* Netflix Logo */}
      <img
        className="relative z-[9999] w-40 md:w-52"
        src={Logo}
        alt="Netflix Logo"
      />

      {/* Right Side */}
      {user && (
        <div className="relative z-[9999] flex items-center gap-3">

          <IoIosArrowDropdown
            size={24}
            color="white"
          />

          <h1 className="text-lg font-medium text-white">
            {user.fullName}
          </h1>

          <button
            onClick={logoutHandler}
            className="rounded bg-red-800 px-4 py-2 text-white"
          >
            Logout
          </button>

          <button
            onClick={toggleHandler}
            className="rounded bg-red-800 px-4 py-2 text-white"
          >
            {toggle ? "Home" : "Search Movie"}
          </button>

        </div>
      )}
    </header>
  );
};

export default Header;