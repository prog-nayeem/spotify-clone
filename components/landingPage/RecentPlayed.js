import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import { playingSongState, playState } from "../../atoms/songAtom";

const RecentPlayed = ({ recentPlayed }) => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingSong, setPlayingSong] = useRecoilState(playingSongState);

  const handlePlay = () => {
    setPlayingSong(recentPlayed);
    if (recentPlayed.uri === playingSong?.uri) {
      setPlay(!play);
    }
  };
  return (
    <>
      <div className="col-span-2 hidden sm:block bg-gray-800 p-4 rounded-md max-h-[470px] overflow-y-scroll scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-gray-400">
        <h2 className="text-xl text-white font-semibold mb-5 ">
          Recent Played
        </h2>

        {recentPlayed.map((current) => (
          <>
            <div
              onClick={handlePlay}
              className="flex items-end space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-200 ease-linear"
            >
              <div className="w-12 h-12 rounded-full relative">
                <Image
                  src={current.track.album.images[1].url}
                  alt=""
                  objectFit="cover"
                  layout="fill"
                  className="flex-shrink-0 rounded-full"
                />
              </div>
              <div>
                <p className="text-gray-100 lg:w-full max-w-[80px] truncate">
                  {current.track.name}
                </p>
                <p className="text-sm text-gray-400">
                  {current.track.artists[0].name}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default RecentPlayed;
