import React, { useState } from "react";
import Image from "next/image";
import {
  BsFillPlayFill,
  BsHeadphones,
  BsPause,
  BsPauseFill,
} from "react-icons/bs";
import { AiFillHeart, AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { playingSongState, playState } from "../../atoms/songAtom";

const AllSongList = ({ track, searchImage }) => {
  const [liked, setLiked] = useState(false);
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
      <div className="flex group cursor-pointer items-center transition-all duration-200 ease-linear p-2 rounded-md justify-between hover:bg-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-md relative">
            <Image
              src={`${
                searchImage ? track.album.images[1].url : track.images[1].url
              }`}
              alt=""
              objectFit="cover"
              layout="fill"
              className="flex-shrink-0 rounded-md"
            />
          </div>
          <div>
            <p className="text-gray-100">{track.name}</p>
            <p className="text-sm text-gray-400">{track.artists[0].name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mr-4">
          <BsHeadphones className="text-white cursor-pointer text-xl" />
          <div className="flex border border-gray-600 group-hover:border-gray-400  items-center bg-gray-900 relative  w-16 p-2 rounded-full space-x-2">
            <span onClick={() => setLiked((prev) => !prev)}>
              {liked ? (
                <AiFillHeart className="text-2xl cursor-pointer text-[#1db954] active:scale-125 transform transition-all duration-200 ease-in" />
              ) : (
                <AiOutlineHeart className="text-xl cursor-pointer text-gray-300 active:scale-125 transform transition-all duration-200 ease-in" />
              )}
            </span>

            <span
              onClick={handlePlay}
              className="h-10 w-10 cursor-pointer rounded-full border grid place-items-center bg-black border-white absolute -right-4 "
            >
              {track.uri === playingSong?.uri && play ? (
                <BsPauseFill className="text-white font-bold text-xl" />
              ) : (
                <BsFillPlayFill className="text-white text-xl" />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSongList;
