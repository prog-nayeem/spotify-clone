import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import spotifyApi from "../../lib/spotify";
import Row from "./Row";

const Home = () => {
  const { data: session } = useSession();
  const [recentPlayed, setRecentPlayed] = useState([]);
  const [getNewRelease, setGetNewRelease] = useState([]);
  const [getTopTrack, setGetTopTrack] = useState([]);
  const [getAlbum, setGetAlbum] = useState([]);

  console.log("get new release : ", getNewRelease);
  console.log("get top track : ", getTopTrack);
  console.log("get album : ", getAlbum);

  useEffect(() => {
    if (!session?.accessToken) return;
    spotifyApi.setAccessToken(session.accessToken);
  }, [session]);

  // feaching recent playlist
  useEffect(() => {
    if (!session?.accessToken) return;
    spotifyApi
      .getMyRecentlyPlayedTracks()
      .then((res) => setRecentPlayed(res.body.items))
      .catch((err) => console.log(err.message));
    // spotifyApi
    //   .getNewReleases()
    //   .then((res) => setGetNewRelease(res.body.items))
    //   .catch((err) => console.log(err.message));
    // spotifyApi
    //   .getMyTopTracks()
    //   .then((res) => setGetTopTrack(res.body.items))
    //   .catch((err) => console.log(err.message));
    // spotifyApi
    //   .getAlbum()
    //   .then((res) => setGetAlbum(res.body.items))
    //   .catch((err) => console.log(err.message));
  }, [session]);
  useEffect(() => {
    if (!session?.accessToken) return;
    spotifyApi
      .getMyTopTracks()
      .then((res) => setGetTopTrack(res.body.items))
      .catch((err) => console.log(err.message));
  });
  return (
    <>
      <Row data={recentPlayed} heading="Recently played" />
      <Row data={getNewRelease} heading="Today's biggest hits" />
      <Row data={getTopTrack} heading="Pop" />
      <Row data={getAlbum} heading="Featured Charts" />
    </>
  );
};
// spotifyApi.getNewReleases;
// spotifyApi.getMyTopTracks;
// spotifyApi.getAlbum;
// spotifyApi.getArtistTopTracks;
// spotifyApi.getTracks;
export default Home;
