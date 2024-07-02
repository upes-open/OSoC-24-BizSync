import React from "react";

const MoreInfo = () => {
  return (
    <div className="bg-[#0B0121] text-white py-16 px-4 flex items-center justify-center font-[Montserrat] min-h-[70vh]">
      <div className="bg-gray-800 rounded-lg p-6 flex flex-col shadow-lg shadow-purple-500/20 md:w-1/2 gap-4 items-center">
        <p className="text-3xl font-semibold text-center">
          Our powerful analytics <br /> provides invaluable insights
        </p>
        <p className="text-center font-thin text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem explicabo animi quos corpor sit maxime, incidunt,
          dolorem dolorum rerum repudiandae nam ut ipsa Consectetur corrupti
          excepturi fugit aspernatur aberiam! Voluptatibus, totam voluptate
          incidunt tempora nemo, tempore nostrum, facere explicabo fugit soluta
          consectetur hic. Nisi, deserunt culpa.
        </p>

        <button className="bg-transparent border text-white px-6 py-3 w-40 rounded-full font-semibold hover:bg-opacity-90 transition">
          Try Now
        </button>
      </div>
    </div>
  );
};

export default MoreInfo;
