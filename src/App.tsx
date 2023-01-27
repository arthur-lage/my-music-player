import React, { useEffect, useRef, useState } from "react";

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
    let target = document.getElementById("song-progress");

    if (!target) return;

    //@ts-ignore
    const min = target.min;
    //@ts-ignore
    const max = target.max;
    //@ts-ignore
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
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

  function handleSliderAction(e: any) {
    let target = e.target;

    if (e.target.type !== "range") {
      target = document.getElementById("song-progress");
    }

    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";

    audioPlayerRef.current.currentTime = target.value;
    setSongProgress(audioPlayerRef.current.currentTime);
  }

  function handleVolumeSlider(value: number) {
    setAudioVolume(value);
  }

  useEffect(() => {
    audioPlayerRef.current.volume = audioVolume;
  }, [audioVolume]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#091227]">
      <div className="flex flex-col justify-center items-center rounded-lg">
        <header className="flex flex-col items-center">
          <span className="text-2xl text-white font-questrial">{songName}</span>

          <p className="uppercase text-[#A5C0FF] mt-1 mb-8 text-lg opacity-70 font-questrial">
            {artistName}
          </p>

          <img
            className={`w-[15rem] h-[15rem] object-cover rounded-md image-shadow`}
            src={albumImage}
            alt={songName}
          />
        </header>

        <div className="flex items-center flex-col w-full gap-3 mt-10">
          <input
            type="range"
            min={0}
            max={
              Math.floor(audioPlayerRef.current.duration)
                ? Math.floor(audioPlayerRef.current.duration)
                : 0
            }
            step={0.1}
            id="song-progress"
            onChange={(e) => handleSliderAction(e)}
            value={songProgress}
            className="w-full h-[4px] rounded-[50rem] form-range"
          />

          <div className="flex items-center justify-between w-full">
            <span className="text-lg text-[#A5C0FF] font-questrial">
              {Math.floor(audioPlayerRef.current.currentTime / 60)}:
              {Math.floor(audioPlayerRef.current.currentTime % 60) < 10
                ? `0${Math.floor(audioPlayerRef.current.currentTime % 60)}`
                : Math.floor(audioPlayerRef.current.currentTime % 60)}
            </span>

            <span className="text-lg text-[#A5C0FF] font-questrial">
              {audioPlayerRef.current.duration
                ? `${Math.floor(
                    audioPlayerRef.current.duration / 60
                  )}:${Math.round(audioPlayerRef.current.duration % 60)}`
                : "0:00"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-2">
          <button className=" bg-transparent rounded-full p-3 hover:bg-[#ffffff10] transition-all duration-150">
            <SkipBack color={"#fff"} size={32} />
          </button>

          <button
            className=" bg-transparent rounded-full p-3 hover:bg-[#ffffff10] transition-all duration-150"
            onClick={handlePauseButton}
          >
            {isPlaying ? (
              <Pause color={"#fff"} size={32} />
            ) : (
              <Play color={"#fff"} size={32} />
            )}
          </button>

          <button className=" bg-transparent rounded-full p-3 hover:bg-[#ffffff10] transition-all duration-150">
            <SkipForward color={"#fff"} size={32} />
          </button>
        </div>
      </div>

      {/* <div className="flex flex-col gap-4">
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
      </div> */}
    </div>
  );
}
