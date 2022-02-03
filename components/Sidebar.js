import { AiTwotoneHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiLibrary } from "react-icons/bi";
import { MdFeaturedPlayList } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { showSearchInput } from "../atoms/searchAtom";
import { useRecoilState } from "recoil";

const Sidebar = () => {
  const { data: session } = useSession();

  const [showInput, setShowInput] = useRecoilState(showSearchInput);

  return (
    <>
      <div className="bg-black sticky h-screen top-0 flex-1 px-3 py-4 max-w-[270px] min-w-[70px] lg:min-w-[270px]">
        <img
          className="lg:w-36 w-full cursor-pointer shrink-0"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="logo"
        />
        <div className="mt-6">
          {[
            { icon: <AiTwotoneHome />, text: "Home", active: true },
            { icon: <BsSearch />, text: "Search", search: true },
            {
              icon: <BiLibrary />,
              text: "Your Library",
            },
            {
              icon: <MdFeaturedPlayList />,
              text: "Create Playlist",
              section: true,
            },
            { icon: <FaRegHeart />, text: "Liked Songs" },
          ].map(({ icon, text, active, section, search }, index) => (
            <div
              onClick={() => {
                if (!search) return;
                setShowInput((prev) => !prev);
              }}
              key={index}
              className={`text-gray-400 rounded-sm cursor-pointer hover:text-white hover:bg-gray-800 h-12 flex items-center pl-3 space-x-3 ${
                active && "bg-gray-800 !text-white"
              } ${section && "mt-3"}`}
            >
              <span className="text-2xl">{icon}</span>
              <p className="hidden lg:inline-block">{text}</p>
            </div>
          ))}
          <hr className="mt-4 broder border-gray-500 " />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
