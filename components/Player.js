import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import SpotifyPlayer from "react-spotify-web-playback";
import { playingSongState, playState } from "../atoms/songAtom";

const Player = () => {
  const { data: session } = useSession();
  const [playingSong, setPlayingSong] = useRecoilState(playingSongState);
  const [play, setPlay] = useRecoilState(playState);

  useEffect(() => {
    if (playingSong?.uri) {
      setPlay(true);
    }
  }, [playingSong, setPlay]);
  if (!session?.accessToken) return null;
  return (
    <>
      <div className="fixed bottom-0 z-50 right-0 left-0">
        <SpotifyPlayer
          styles={{
            activeColor: "#fff",
            bgColor: "#181818",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
            height: "70px",
            sliderTrackColor: "#535353",
            sliderTrackBorderRadius: "4px",
            sliderHandleColor: "#fff",
            errorColor: "#fff",
          }}
          token={session?.accessToken}
          showSaveIcon
          callback={(state) => {
            setPlay(state.isPlaying);
          }}
          play={play}
          uris={playingSong?.uri ? [playingSong?.uri] : []}
          magnifySliderOnHover={true}
          autoPlay={true}
        />
      </div>
    </>
  );
};

export default Player;
