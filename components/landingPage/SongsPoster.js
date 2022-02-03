import Image from "next/image";
import React from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playingSongState, playState } from "../../atoms/songAtom";

const SongsPoster = ({ track, searchImage }) => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingSong, setPlayingSong] = useRecoilState(playingSongState);

  const handlePlay = () => {
    setPlayingSong(track);
    if (track.uri === playingSong?.uri) {
      setPlay(!play);
    }
  };
  return (
    <>
      <div className="hover:bg-gray-700 w-full min-w-[230px] flex-1 max-h-[317px] group relative bg-gray-800 transition-all duration-200 cursor-pointer p-4 rounded-md">
        <div className="relative box-border w-full flex-shrink-0 h-56 object-cover ">
          <Image
            src={`${
              searchImage ? track.album.images[1].url : track.images[1].url
            }`}
            alt=""
            objectFit="cover"
            layout="fill"
            className="flex-shrink-0"
          />
        </div>
        <span
          onClick={handlePlay}
          className="absolute right-6 bottom-16 shadow-lg opacity-0 transition-all duration-200 group-hover:bottom-[80px] z-30 group-hover:opacity-100  p-2 bg-green-500 rounded-full "
        >
          {track.uri === playingSong?.uri && play ? (
            <BsPauseFill className="text-white font-bold text-2xl" />
          ) : (
            <BsFillPlayFill className="text-2xl text-white" />
          )}
        </span>
        <h3 className="font-semibold text-gray-200 mt-2 text-ellipsis">
          {track?.name}
        </h3>
        <p className="text-sm text-ellipsis text-gray-400">
          {track.artists[0].name}
        </p>
      </div>
    </>
  );
};

export default SongsPoster;
