import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { tracks } from '../data/tracks';

const AudioPlayerContext = createContext(null);

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const shouldPlayRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayer, setHasPlayer] = useState(false);
  const [progress, setProgress] = useState({ currentTime: 0, duration: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTime = () => {
      setProgress({
        currentTime: audio.currentTime || 0,
        duration: audio.duration || 0,
      });
    };
    const handleEnded = () => {
      shouldPlayRef.current = true;
      setCurrentIndex((prev) => {
        if (prev === null) return prev;
        return (prev + 1) % tracks.length;
      });
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('loadedmetadata', handleTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('loadedmetadata', handleTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIndex === null) return;
    audio.src = tracks[currentIndex].src;
    audio.load();
    if (shouldPlayRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentIndex]);

  const playTrack = (index) => {
    if (index < 0 || index >= tracks.length) return;
    setHasPlayer(true);
    shouldPlayRef.current = true;
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentIndex === null) {
      playTrack(0);
      return;
    }
    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  const playNext = () => {
    if (tracks.length === 0) return;
    setHasPlayer(true);
    shouldPlayRef.current = true;
    setCurrentIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % tracks.length;
    });
  };

  const playPrevious = () => {
    if (tracks.length === 0) return;
    setHasPlayer(true);
    shouldPlayRef.current = true;
    setCurrentIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + tracks.length) % tracks.length;
    });
  };

  const seekTo = (time) => {
    const audio = audioRef.current;
    if (!audio || Number.isNaN(time)) return;
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
    setProgress({
      currentTime: audio.currentTime || 0,
      duration: audio.duration || 0,
    });
  };

  const value = useMemo(
    () => ({
      tracks,
      currentIndex,
      currentTrack: currentIndex !== null ? tracks[currentIndex] : null,
      isPlaying,
      hasPlayer,
      progress,
      playTrack,
      togglePlay,
      playNext,
      playPrevious,
      seekTo,
    }),
    [currentIndex, isPlaying, hasPlayer, progress],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="none" />
    </AudioPlayerContext.Provider>
  );
}
