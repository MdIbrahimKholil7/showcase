import React, { useState } from "react";
import { Layout } from "../components";
import circle from "../assets/profileCircle.png";
import women from "../assets/women.png";

import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const initialState = {
  otp: "",
};
const CompleteProfile = () => {
  const [formData, setFormData] = useState(initialState);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialState);
  };
  const loaderVariants = {
    animationOne: {
      y: [0, 20],
      x: [10, 30],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 2.95,
          delay: 1,
        },
        y: {
          yoyo: Infinity,
          duration: 2.25,
          ease: "easeOut",
        },
      },
    },
  };
  return (
    <Layout>
      <div className=" py-11  flex flex-row h-full">
        <div className=" hidden md:block basis-1/4">
          <img src={circle} alt="circle" />
        </div>
        <div className="md:basis-2/4 basis-4/4 py-6  md:px-8 ">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-400 font-bold flex text-lg items-center cursor-pointer">
              <FaAngleLeft />
              <Link to="/completeProfile">Back</Link>
            </h1>
            <div className="flex justify-end items-end flex-col">
              <p className="text-gray-400 test-md">STEP 03/03</p>
              <h1 className="text-gray-400 text-lg font-bold">phonenumber</h1>
            </div>
          </div>
          <div className=" flex flex-col items-center  justify-center">
            <div className="px-9 py-10 w-2/3">
              <h1 className="capitalize text-center text-2xl font-semibold text-gray-900">
                Complete your profile page!
              </h1>
              <p className="font-normal text-md text-gray-400 capitalize">
                For purpose of industry regulation,yours details are required
              </p>

              <form
                onSubmit={handleOnSubmit}
                className="form-control flex justify-center  flex-col gap-3 mt-9  w-full max-w-xs"
              >
                <div className="w-full">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Enter Otp *
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.otp}
                    onChange={(e) => {
                      setFormData({ ...formData, otp: e.target.value });
                    }}
                    placeholder="451125"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="text-lg text-white bg-blue-500 px-4 py-2 rounded-md  hover:bg-blue-400 transition-colors delay-100 ease-out"
                >
                  Save & continue
                </button>
                <p className="test-sm flex items-center justify-center text-gray-500 gap-1 text-center">
                  <AiOutlineLock /> your account is safely secured
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="basis-1/4 md:flex items-center relative hidden   ">
          <img
            src={women}
            alt="phone"
            className="absolute  h-[730px] w-[330px] "
          />
        </div>
      </div>
    </Layout>
  );
};

export default CompleteProfile;
