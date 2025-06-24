"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useRef, useEffect } from "react";
import { BsSoundwave } from "react-icons/bs";
import { IoPauseOutline, IoPlayOutline } from "react-icons/io5";

export default function ListenBlog({ permalink }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const audioUrl = `https://hey-sainty.s3.ap-south-1.amazonaws.com/blog-tts/${permalink}.mp3`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setIsStarted(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
    setIsStarted(true);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="sticky bottom-20 w-full flex justify-center z-5 px-4">
      <div className="bg-muted/20 backdrop-blur-md border border-muted-foreground/50 rounded-full shadow-md px-8 py-3 flex items-center gap-4 max-w-md w-full sm:w-fit">
        {!isStarted ? (
          <button
            onClick={handleToggle}
            className="flex items-center gap-3 hover:scale-105 transition-transform px-2"
          >
            <BsSoundwave className="text-primary animate-pulse" size={20} />
            <span className="text-sm font-medium text-foreground">
              Listen to Blog
            </span>
          </button>
        ) : (
          <>
            <button
              onClick={handleToggle}
              className="text-primary hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <IoPauseOutline size={20} />
              ) : (
                <IoPlayOutline size={20} />
              )}
            </button>
            <div className="flex items-center gap-2 min-w-[120px]">
              <Progress
                value={(currentTime / duration) * 100 || 0}
                className="w-32 h-1"
              />
              <span className="text-xs text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </>
        )}
        <audio ref={audioRef} src={audioUrl} preload="auto" />
      </div>
    </div>
  );
}
