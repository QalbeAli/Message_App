import React from "react";

const Stats = () => {
  return (
    <section className="py-10 bg-[#1B263B] container my-8 rounded-xl  ">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap- mt-2 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold text-7xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                {" "}
                6+{" "}
              </span>
            </h3>
            <p className="text-base mt-0.5 text-gray-500">
            videos created with revid.ai
            </p>
          </div>

          <div>
            <h3 className="font-bold text-7xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                {" "}
                600%{" "}
              </span>
            </h3>
            <p className="text-base mt-0.5 text-gray-500">increase in video engagement with AI suggestions</p>
          </div>

          <div>
            <h3 className="font-bold text-7xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                {" "}
                1458+{" "}
              </span>
            </h3>
            <p className="text-base mt-0.5 text-gray-500">
            creators using revid.ai
            </p>
          </div>
          <div>
            <h3 className="font-bold text-7xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                {" "}
                200%{" "}
              </span>
            </h3>
            <p className="text-base mt-0.5 text-gray-500">
            average monthly growth on users businesses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
