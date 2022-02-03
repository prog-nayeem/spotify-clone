import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import spotifyApi from "../../lib/spotify";
import { useRecoilState } from "recoil";
import { searchInputValue } from "../../atoms/searchAtom";
import SongsPoster from "./SongsPoster";
import RecentPlayed from "./RecentPlayed";
import AllSongList from "./AllSongsList";
import Filter from "./Filter";

const Home = () => {
  const [recentPlayed, setRecentPlayed] = useState([]);
  const [getInitialSong, setInitialSong] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useRecoilState(searchInputValue);

  useEffect(() => {
    if (!session?.accessToken) return;
    spotifyApi.setAccessToken(session.accessToken);
  }, [session]);

  // feaching playlist
  useEffect(() => {
    if (!session?.accessToken) return;
    spotifyApi
      .getNewReleases()
      .then((res) => setInitialSong(res.body.albums.items))
      .catch((err) => console.log(err.message));
  }, [session]);

  useEffect(() => {
    if (!session?.accessToken) return;
    spotifyApi
      .getMyRecentlyPlayedTracks()
      .then((res) => setRecentPlayed(res.body.items))
      .catch((err) => console.log(err.message));
  }, [session]);

  useEffect(() => {
    if (!searchValue) return setSearchResult([]);
    if (!session?.accessToken) return;
    spotifyApi
      .searchTracks(searchValue)
      .then((res) => setSearchResult(res.body.tracks.items))
      .catch((err) => console.log(err.message));
  }, [session, searchValue]);

  return (
    <>
      <div className="grid grid-cols-7 gap-x-4 mt-4 px-6 mb-12">
        <div className="sm:col-span-5  col-span-7">
          <div className="flex items-center overflow-x-scroll scrollbar-hide justify-between space-x-7">
            {searchResult === undefined || searchResult.length === 0
              ? getInitialSong
                  .slice(-4)
                  .map((track) => <SongsPoster key={track.id} track={track} />)
              : searchResult
                  .slice(-4)
                  .map((track) => (
                    <SongsPoster key={track.id} searchImage track={track} />
                  ))}
          </div>
          <div className="mt-8 bg-gray-800 p-2 max-h-96 overflow-y-scroll scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-gray-400 rounded-md">
            <h2 className="text-white font-semibold text-xl mb-6">
              Top Tracks
            </h2>
            {searchResult === undefined || searchResult.length === 0
              ? getInitialSong.map((track) => (
                  <AllSongList key={track.id} track={track} />
                ))
              : searchResult.map((track) => (
                  <AllSongList key={track.id} searchImage track={track} />
                ))}
          </div>
        </div>
        <div className="col-span-2">
          <RecentPlayed recentPlayed={recentPlayed} />

          <Filter />
        </div>
      </div>
    </>
  );
};

export default Home;
