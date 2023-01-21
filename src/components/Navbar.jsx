import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { VscThreeBars } from "react-icons/vsc";
import { CgClose } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
// =======
import {
  commonCategory,
  homeCategories,
  Kids,
  mensCategories,
  womenCategories,
} from "../utils/data";
import { useCookies } from "react-cookie";
import axios from "axios";
// >>>>>>> 606301900deb403c949899cf94cbf7d5f0d3b2c2
const Navbar = ({ adminNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDashboard = async () => {
    if (cookies?.token !== "undefined") {
      console.log(cookies.token);
      try {
        const { data } = await axios.get("https://api.showcaseurbusiness.com/user/infor", {
          headers: {
            Authorization: cookies?.token,
          },
        });

        if (data?.role === 1) {
          navigate("/businessProfile/businessDashboard");
        }
        if (data?.role === 0) {
          navigate("/dashboard/normalDashboard");
        }
      } catch (err) {
        if (err?.response?.status === 403 || err?.response?.status === 400) {
          removeCookie("token");
          navigate("/auth");
        }
        console.log(err);
      }
    } else {
      removeCookie("token");
      navigate("/auth");
    }
  };

  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("token");
    removeCookie("token");
    navigate("/");
  };

  // for filtering data
  const handleOption = (content, user) => {
    navigate(`/products/${content}-${user}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/products/${event.target.value}-input`);
    }
  };

  return (
    <div className="shadow-md md:py-2 px-6 py-0">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex gap-[10px] md:gap-8 items-center justify-between ">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            className="h-[57px] w-[110px] cursor-pointer"
          />
          {/* Search  */}
          <div className="md:w-auto w-[157px]  bg-gray-100 py-2  rounded-2xl">
            <label className="input-group">
              <span className="bg-inherit">
                <BiSearchAlt className="text-gray-900" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="outline-none border-none bg-inherit"
                onKeyDown={handleKeyDown}
              />
            </label>
          </div>
        </div>
        {!adminNav && (
          <div className="lg:flex hidden  items-center justify-center gap-4">
            <h1
              onClick={() => navigate(`/products/${"product-allVideo"}`)}
              className="text-md text-gray-400 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
            >
              Product Videos
            </h1>
            <div className="dropdown dropdown-hover">
              <h1
                tabIndex={0}
                className="text-md flex items-center gap-1 text-gray-400 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
              >
                Clothing <FiChevronDown />
              </h1>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 "
              >
                {mensCategories.map((item) => (
                  <li key={item.id}>
                    <p
                      className="capitalize"
                      onClick={() => handleOption(item?.name, "Men")}
                    >
                      {item.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown dropdown-hover">
              <h1
                tabIndex={0}
                className="text-md flex items-center gap-1 text-gray-400 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
              >
                Electronics <FiChevronDown />
              </h1>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 "
              >
                {womenCategories.map((item) => (
                  <li key={item.id}>
                    <p
                      className="capitalize"
                      onClick={() => handleOption(item?.name, "Women")}
                    >
                      {item.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <h1
                tabIndex={0}
                className="text-md flex items-center gap-1 text-gray-400 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
              >
                Grocery <FiChevronDown />
              </h1>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 "
              >
                {Kids.map((item) => (
                  <li key={item.id}>
                    <p
                      className="capitalize"
                      onClick={() => handleOption(item?.name, "Kids")}
                    >
                      {item.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <h1
                tabIndex={0}
                className="text-md flex items-center gap-1 text-gray-400 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
              >
                AutoMobiles <FiChevronDown />
              </h1>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 "
              >
                {homeCategories.map((item) => (
                  <li key={item.id}>
                    <p
                      className="capitalize"
                      onClick={() => handleOption(item?.name, "Home&Kitchen")}
                    >
                      {item.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Actions link */}

        {/* users */}

        <div className="hidden md:block">
          <div className="flex items-center justify-center gap-1 md:gap-5 ">
            <div className="bg-sky-100 rounded-lg cursor-pointer">
              {/* <BiUser className="md:text-2xl text-xl" /> */}
              <div className="dropdown ">
                <label tabIndex={0} className="btn p-3  m-1">
                  <BiUser className="md:text-2xl text-xl " />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-auto"
                >
                  <li onClick={handleDashboard} className="w-32">
                    <Link to="/dashboard/normalDashboard">My Account</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {cookies?.token !== "undefined" ? (
          <button
            onClick={handleSignOut}
            className="py-2 hidden lg:flex rounded-lg px-6 text-lg text-white bg-blue-500 hover:bg-blue-400 transition-colors delay-100 ease-out"
          >
            Sign Out
          </button>
        ) : (
          <button className="py-2 hidden lg:flex rounded-lg px-6 text-lg text-white bg-blue-500 hover:bg-blue-400 transition-colors delay-100 ease-out">
            {<Link to="/auth">Login</Link>}
          </button>
        )}

        {!isOpen && (
          <VscThreeBars
            onClick={toggle}
            className="lg:hidden block text-3xl   cursor-pointer text-gray-900"
          />
        )}

        {isOpen && (
          <div className="top-0 left-0  h-auto absolute w-full px-4 py-2 backdrop-blur-sm bg-white/95 z-40 shadow-lg pb-5 duration-150">
            <div className="flex justify-end">
              <CgClose
                onClick={toggle}
                className=" text-3xl cursor-pointer text-gray-900 "
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1
                onClick={() => navigate(`/products/${"product-allVideo"}`)}
                className="text-lg flex items-center justify-center text-gray-700 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
              >
                Product Videos
              </h1>
              <div className="dropdown dropdown-end">
                <h1
                  tabIndex={0}
                  className="text-lg flex items-center justify-center text-gray-700 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
                >
                  Clothing <FiChevronDown />
                </h1>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 "
                >
                  {mensCategories.map((item) => (
                    <li key={item.id}>
                      <p
                        className="capitalize"
                        onClick={() => handleOption(item?.name, "Men")}
                      >
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dropdown dropdown-end">
                <h1
                  tabIndex={0}
                  className="text-lg flex items-center justify-center text-gray-700 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
                >
                  Electronics <FiChevronDown />
                </h1>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 "
                >
                  {womenCategories.map((item) => (
                    <li key={item.id}>
                      <p
                        className="capitalize"
                        onClick={() => handleOption(item?.name, "Women")}
                      >
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dropdown dropdown-end">
                <h1
                  tabIndex={0}
                  className="text-lg flex items-center justify-center text-gray-700 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
                >
                  Grocery <FiChevronDown />
                </h1>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 "
                >
                  {Kids.map((item) => (
                    <li key={item.id}>
                      <p
                        className="capitalize"
                        onClick={() => handleOption(item?.name, "Kids")}
                      >
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dropdown dropdown-end">
                <h1
                  tabIndex={0}
                  className="text-lg flex items-center justify-center text-gray-700 cursor-pointer hover:text-black transition-colors delay-75 ease-in-out"
                >
                  AutoMobiles <FiChevronDown />
                </h1>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 "
                >
                  {homeCategories.map((item) => (
                    <li key={item.id}>
                      <p
                        className="capitalize"
                        onClick={() => handleOption(item?.name, "Home&Kitchen")}
                      >
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="block md:hidden">
                <div className="flex items-center justify-center gap-1 md:gap-5 ">
                  <div className="bg-sky-100 rounded-lg cursor-pointer">
                    {/* <BiUser className="md:text-2xl text-xl" /> */}
                    <div className="dropdown ">
                      <label tabIndex={0} className="btn p-3  m-1">
                        <BiUser className="md:text-2xl text-xl " />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-auto"
                      >
                        <li onClick={handleDashboard} className="w-32">
                          <Link to="/dashboard/normalDashboard">
                            My Account
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {cookies?.token !== "undefined" ? (
                <button
                  onClick={handleSignOut}
                  className="py-2 lg:flex rounded-lg px-6 text-lg text-white bg-blue-500 hover:bg-blue-400 transition-colors delay-100 ease-out"
                >
                  Sign Out
                </button>
              ) : (
                <button className="text-lg text-white bg-blue-500 px-2 py-1 rounded-md  hover:bg-blue-400 transition-colors delay-100 ease-out">
                  <Link to="/auth">Login</Link>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
