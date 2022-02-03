import React from "react";

const Filter = () => {
  return (
    <>
      <div className="mt-7 hidden md:block bg-gray-800 rounded-md p-3">
        <h2 className="text-white text-xl font-semibold mb-4">Filter</h2>
        <div className="flex items-center flex-wrap space-x-3">
          {[
            "Today hits",
            "Top mixes",
            "Workout",
            "Focus",
            "Sad songs",
            "Happy",
            "Instrumental",
            "Chill",
            " Mood",
          ].map((current, index) => (
            <p
              key={index}
              className="text-white mt-3 hover:scale-110 transition-all duration-200 ease-linear transform bg-gray-900 shadow-md cursor-pointer rounded-full px-4 py-2"
            >
              {current}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
