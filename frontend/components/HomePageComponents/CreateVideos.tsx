"use client"
import React from "react";
import { useRouter } from "next/navigation";
const CreateVideos = () => {
  const router = useRouter();

  const handleClickCreate = () => {
    router.push("/create")
  }

  return (
    <>
      <div className="container bg-[#000000] rounded-xl mt-10 mx-auto">
        <div className="flex flex-col items-center justify-center pt-10 pb-12">
          <div className="shrink-0">
            <img
              className="w-auto h-9"
              src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg"
              alt="Logo"
            />
          </div>
          <div className="py-8 text-2xl text-center text-gray-100">
            Turn text into captivating videos in minutes – all powered by AI. No{" "}
            <br /> video editing skills needed.
          </div>
          <div>
            <div className="relative flex items-center justify-center group">
              <div className="relative group">
                <div className="absolute inset-0 transition-all duration-200 rounded-full bg-gradient-to-r from-green-500 to-blue-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <button
                  className="relative z-10 inline-flex items-center justify-center px-12 py-3 text-sm font-bold text-white bg-black border border-transparent rounded-full md:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  role="button"
                  onClick={handleClickCreate}
                >
                  Create Videos Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVideos;
