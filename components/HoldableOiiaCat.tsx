"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HoldableOiiaCat() {
  const [showMeme, setShowMeme] = useState(false);
  const [pressTime, setPressTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPress = () => {
    setShowMeme(true);

    let time = 0;
    intervalRef.current = setInterval(() => {
      time += 0.1;
      setPressTime(parseFloat(time.toFixed(1)));
    }, 100);
  };

  const endPress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setShowMeme(false);
    setPressTime(0);
  };

  useEffect(() => {
    const handleGlobalEnd = () => {
      endPress();
    };

    window.addEventListener("mouseup", handleGlobalEnd);
    window.addEventListener("touchend", handleGlobalEnd);

    return () => {
      window.removeEventListener("mouseup", handleGlobalEnd);
      window.removeEventListener("touchend", handleGlobalEnd);
    };
  }, []);

  return (
    <div
      className="relative w-full h-96 flex items-center justify-center select-none"
      onMouseDown={startPress}
      onTouchStart={startPress}
    >
      {/* 기본 고양이 이미지 */}
      {!showMeme && (
        <Image
          src="/oiia-cat.png"
          alt="Oiia Cat"
          width={200}
          height={200}
          priority
        />
      )}

      {/* 밈 이미지 (누르는 동안만 보여짐) */}
      {showMeme && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 pointer-events-none">
          <Image
            src="/meme/oiia-cat-meme.gif"
            alt="Oiia Cat Meme"
            width={200}
            height={200}
          />
        </div>
      )}

      {/* 타이머 */}
      {pressTime > 0 && (
        <div className="absolute bottom-4 text-xl font-bold text-black bg-white/70 px-3 py-1 rounded-xl z-20">
          ⏱️ {pressTime.toFixed(1)}초 누르는 중...
        </div>
      )}
    </div>
  );
}
