import React from "react";
import Image from "next/image";

const Captions = () => {
  return (
    <>
      <section className="relative py-12 overflow-hidden bg-[#1B263B] container mx-auto rounded-xl mt-6 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-2 lg:px-4 max-w-7xl w-full flex flex-col md:flex-row">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-16">
            {/* Image on the right */}
            <div className="relative w-full h-full flex mt-8 items-center justify-center">
              <Image
                src="/caption.jpg"
                alt="Captions Image"
                width={700} // Adjust width as needed
                height={500} // Adjust height as needed
                className="object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="text-3xl text-white font-bold text-center md:text-left   ">
                Find What Goes Viral
              </div>
              <p className="mt-4 text-lg text-center md:text-left  font-normal text-gray-400 sm:mt-8">
                AI will find the best content for you that you can easily
                repurpose into TikTok videos.
              </p>
              <div className="mt-8 text-gray-100">
                <div className="flex ">
                  ✅ <p className="px-3">Search with complex queries</p>{" "}
                </div>
                <div className="flex py-2 ">
                  ✅ <p className="px-3">Search with complex queries</p>{" "}
                </div>
                <div className="flex ">
                  ✅ <p className="px-3">Search with complex queries</p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Captions;
