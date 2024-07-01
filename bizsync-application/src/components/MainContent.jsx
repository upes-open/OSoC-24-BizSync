import React from "react";

const MainContent = () => {
  return (
    <div className="p-2 w-full min-h-dvh flex items-center" id="main-content">
      <div className="max-w-6xl mx-auto text-white md:my-24">
        <div className="text-center mb-16">
          <h1 className="md:text-5xl text-4xl font-[Montserrat] mb-4">
            Seamless Business Management
            <br />
            <span className="text-4xl">with</span>
            <br />
            <span className="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold">
              BizSync
            </span>
          </h1>
          <p className="text-gray-300 mb-8 md:text-md text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse{" "}
            <br />
            varius enim in eros elementum tristique.
          </p>
          <div className="md:space-x-4 md:block flex flex-col w-full items-center gap-4">
            <button className="bg-white text-purple-900 px-6 py-3 w-40 rounded-full font-semibold hover:bg-opacity-90 transition">
              Try Now
            </button>
            <button className="bg-transparent border border-white px-6 py-3 w-40 rounded-full font-semibold hover:bg-white hover:text-purple-900 transition">
              Contact Us
            </button>
          </div>
        </div>

        <div className="bg-black bg-opacity-50 rounded-lg p-6 shadow-2xl">
          <img
            src="/assets/home-image.png"
            alt="BizSync Dashboard"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      <style>
        {`
          #main-content {
            background-image: url(./assets/home-background.png);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
    </div>
  );
};

export default MainContent;
