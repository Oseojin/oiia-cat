"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HoldableOiiaCat() {
  const [showMeme, setShowMeme] = useState(false);
  const [pressTime, setPressTime] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  //const soundRef = useRef<HTMLAudioElement | null>(null);

  const startPress = () => {
    if (isPressing) return;
    setIsPressing(true);

    let time = 0;
    intervalRef.current = setInterval(() => {
      time += 0.1;
      setPressTime(parseFloat(time.toFixed(1)));
    }, 100);

    timerRef.current = setTimeout(() => {
      setShowMeme(true);
      //soundRef.current?.play();
    }, 100);
  };

  const endPress = () => {
    if (!isPressing) return;

    setIsPressing(false);
    clearTimeout(timerRef.current!);
    clearInterval(intervalRef.current!);
    setShowMeme(false);
    setPressTime(0);

    // if (soundRef.current) {
    //   soundRef.current.pause();
    //   soundRef.current.currentTime = 0;
    // }
  };

  useEffect(() => {
    // soundRef.current = new Audio("/sounds/oiia-meme.mp3");
    // soundRef.current.volume = 0.6;
    return () => {
      clearTimeout(timerRef.current!);
      clearInterval(intervalRef.current!);
    };
  }, []);

  return (
    <div
      className="relative w-full h-96 flex items-center justify-center select-none"
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
    >
      {/* ⏱️ 타이머 */}
      {pressTime > 0 && (
        <div className="absolute bottom-4 text-xl font-bold text-black bg-white/70 px-3 py-1 rounded-xl z-20">
          {pressTime.toFixed(1)}
        </div>
      )}
      {/* ✅ 고양이 이미지: 밈이 아닐 때만 표시 */}
      {!showMeme && (
        <Image
          src="/oiia-cat.png"
          alt="Oiia Cat"
          width={200}
          height={200}
          priority
        />
      )}

      {/* ✅ 밈 이미지: 누르고 1초 지나면 표시 */}
      {showMeme && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <Image
            src="/meme/oiia-cat-meme.gif"
            alt="Oiia Cat Meme"
            width={300}
            height={300}
          />
        </div>
      )}
    </div>
  );
}
