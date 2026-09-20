import React from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute z-10 w-full text-white pt-[18%] px-12">
      
      <h1 className="text-3xl md:text-4xl font-bold">
        {title}
      </h1>

      <p className="w-1/3 mt-4 text-sm md:text-base">
        {overview}
      </p>

      <div className="flex mt-8">
        
        {/* Play Button */}
        <button className="flex items-center px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">
          <CiPlay1 size={24} />
          <span className="ml-1">Play</span>
        </button>

        {/* More Info Button */}
        <button className="flex mx-2 items-center px-6 py-2 bg-gray-500/70 text-white rounded-md hover:bg-gray-500 transition">
          <CiCircleInfo size={24} />
          <span className="ml-1">Watch more</span>
        </button>

      </div>
    </div>
  );
};

export default VideoTitle;