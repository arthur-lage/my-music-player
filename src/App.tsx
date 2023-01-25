import { useEffect, useRef, useState } from "react";

import Song1 from "./assets/song1.mp3";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SpeakerHigh,
} from "phosphor-react";

export function App() {
  const [songName, setSongName] = useState("Nome");
  const [artistName, setArtistName] = useState("Artist");
  const [albumImage, setAlbumImage] = useState(
    "https://blogtectoy.com.br/wp-content/uploads/2019/12/S3k-capa.jpg"
  );
  const [songProgress, setSongProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.2);

  setInterval(() => {
    setSongProgress(audioPlayerRef.current.currentTime);
  }, 1000);

  const audioPlayerRef = useRef(new Audio(Song1));

  function handlePauseButton() {
    if (isPlaying) {
      setIsPlaying(false);
      audioPlayerRef.current.pause();
    } else {
      setIsPlaying(true);
      audioPlayerRef.current.play();
    }
  }

  useEffect(() => {}, []);

  function handleSliderAction(value: number) {
    audioPlayerRef.current.currentTime = value;
    setSongProgress(audioPlayerRef.current.currentTime);
  }

  function handleVolumeSlider(value: number) {
    setAudioVolume(value);
  }

  useEffect(() => {
    audioPlayerRef.current.volume = audioVolume;
  }, [audioVolume]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <header className="flex flex-col items-center">
        <b className="text-xl text-zinc-900">{songName}</b>

        <p className="my-6 text-lg text-zinc-800 font-medium">{artistName}</p>

        <img
          className={`w-[17.5rem] spin-slow h-[17.5rem] object-cover border-4 border-black shadow-[0px 0px 3px 2px rgba(0,0,0,0.5)] rounded-full ${
            isPlaying ? "" : "paused-animation"
          }`}
          src={albumImage}
          alt={songName}
        />
      </header>

      <div className="flex items-center gap-3 mt-5">
        <span className="text-xl text-zinc-700 font-medium">
          {Math.floor(audioPlayerRef.current.currentTime / 60)}:
          {Math.floor(audioPlayerRef.current.currentTime % 60) < 10
            ? `0${Math.floor(audioPlayerRef.current.currentTime % 60)}`
            : Math.floor(audioPlayerRef.current.currentTime % 60)}
        </span>

        <input
          type="range"
          min={0}
          max={
            Math.floor(audioPlayerRef.current.duration)
              ? Math.floor(audioPlayerRef.current.duration)
              : 0
          }
          step={0.1}
          onChange={(e) => handleSliderAction(Number(e.target.value))}
          value={songProgress}
        />

        <span className="text-xl text-zinc-700 font-medium">
          {audioPlayerRef.current.duration
            ? `${Math.floor(audioPlayerRef.current.duration / 60)}:${Math.round(
                audioPlayerRef.current.duration % 60
              )}`
            : "0:00"}
        </span>
      </div>

      <div className="flex items-center gap-5 mt-5">
        <button className="bg-transparent rounded-full p-3 hover:bg-zinc-300 transition-all duration-150 action-button-shadow">
          <SkipBack size={32} />
        </button>

        <button
          className="bg-transparent rounded-full p-3 hover:bg-zinc-300 transition-all duration-150 action-button-shadow"
          onClick={handlePauseButton}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>

        <button className="bg-transparent rounded-full p-3 hover:bg-zinc-300 transition-all duration-150 action-button-shadow">
          <SkipForward size={32} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <SpeakerHigh size={32} />

        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={audioVolume}
          //@ts-ignore
          onInput={(e) => setAudioVolume(e.target.value)}
        />
      </div>
    </div>
  );
}
