import React from "react";

const Button = () => {
  return (
    <>
      <div className="relative flex items-center py-10 justify-center group">
        <div className="relative group">
          <div className="absolute inset-0 transition-all duration-200 rounded-full bg-gradient-to-r from-green-500 to-blue-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
          <button
            className="relative z-10 font-bold inline-flex items-center justify-center px-12 py-3 text-sm md:text-base text-white bg-[#415A77] border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            role="button"
          >
            Generate Video!
          </button>
        </div>
      </div>
    </>
  );
};

export default Button;
