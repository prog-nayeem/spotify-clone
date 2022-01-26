import Image from "next/image";
import { BsFillPlayCircleFill, BsFillPlayFill } from "react-icons/bs";

const Row = ({ data, heading }) => {
  return (
    <>
      <div className="text-white mt-8 px-10 w-full">
        <div className="flex items-center justify-between">
          <h2 className="hover:underline cursor-pointer font-bold text-2xl">
            {heading}
          </h2>
          <h2 className="hover:underline cursor-pointer text-gray-300">
            See all
          </h2>
        </div>
        <div className="grid grid-flow-col gap-6 mt-5">
          {data.map(({ track }) => (
            <>
              <div
                key={track.id}
                className="hover:bg-gray-700 max-h-[317px] group relative bg-gray-800 transition-all duration-200 cursor-pointer p-4 rounded-sm"
              >
                <div className="relative box-border w-52 h-56 object-cover ">
                  <Image
                    src={track.album.images[1].url}
                    alt=""
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
                <span className="absolute right-6 bottom-16 shadow-lg opacity-0 transition-all duration-200 group-hover:bottom-[88px] z-30 group-hover:opacity-100  p-2 bg-green-500 rounded-full ">
                  <BsFillPlayFill className="text-2xl" />
                </span>
                <h3 className="font-semibold mt-2">{track.name}</h3>
                <p className="text-sm truncate text-gray-300">
                  {track.album.name}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Row;
