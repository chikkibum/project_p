"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BARS_COUNT = 5;
const WAVEFORM_INTERVAL = 100;
const DEFAULT_AUDIO = '';

const getRandomHeights = () => {
  return Array.from({ length: BARS_COUNT }, () => Math.random() * 0.8 + 0.2);
};

interface MusicToggleButtonProps {
  audioSrc?: string;
  playing?: boolean;
}

export const MusicToggleButton = ({ audioSrc = DEFAULT_AUDIO, playing = false }: MusicToggleButtonProps) => {
  const [heights, setHeights] = useState(getRandomHeights());
  const [isPlaying, setIsPlaying] = useState(playing);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsPlaying(playing);
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = true;

    // Auto-play/pause based on playing prop
    if (playing && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to auto-play audio:", error);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, playing]);

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, WAVEFORM_INTERVAL);

      return () => clearInterval(intervalId);
    }
    setHeights(Array(BARS_COUNT).fill(0.1));
  }, [isPlaying]);

  const handleClick = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ padding: "12px 12px" }}
      whileHover={{ padding: "16px 16px" }}
      whileTap={{ padding: "16px 16px" }}
      transition={{ duration: 1, bounce: 0.6, type: "spring" }}
      className="bg-background cursor-pointer rounded-full p-2"
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", bounce: 0.35 }}
        className="flex h-[18px] w-full items-center gap-1 rounded-full"
      >
        {heights.map((height, index) => (
          <motion.div
            key={index}
            className="bg-foreground w-[1px] rounded-full"
            initial={{ height: 1 }}
            animate={{ height: Math.max(4, height * 14) }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
