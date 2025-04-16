"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HoldableOiiaCat() {
  const [showMeme, setShowMeme] = useState(false);
  const [gifKey, setGifKey] = useState(Date.now()); // ✅ gif 강제 초기화를 위한 key
  const [pressTime, setPressTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) {
      // 우클릭일 경우 바로 종료
      endPress();
      return;
    }

    startPress();
  };

  const startPress = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current
        .play()
        .catch((e) => console.warn("사운드 재생 실패:", e));
    }
    setShowMeme(true);
    setGifKey(Date.now()); // ✅ gif 강제 새로고침

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

    // ✅ 사운드 정지 및 초기화
    if (soundRef.current) {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    // ✅ 사운드 초기화 + 반복 재생 설정
    soundRef.current = new Audio("/sounds/oiia-meme.mp3");
    soundRef.current.loop = true;
    soundRef.current.volume = 0.6;
    soundRef.current.preload = "auto";

    const handleGlobalEnd = () => {
      endPress();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // (선택사항) 우클릭 메뉴 방지
      endPress(); // 우클릭 시에도 강제로 종료
    };

    window.addEventListener("mouseup", handleGlobalEnd);
    window.addEventListener("touchend", handleGlobalEnd);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("mouseup", handleGlobalEnd);
      window.removeEventListener("touchend", handleGlobalEnd);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div
      className="relative w-full h-96 flex items-center justify-center select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={startPress}
    >
      {/* 타이머 */}
      {pressTime > 0 && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xl font-bold text-black bg-white/70 px-3 py-1 rounded-xl z-20">
          {pressTime.toFixed(1)}
        </div>
      )}

      {/* 기본 이미지 */}
      {!showMeme && (
        <Image
          src="/oiia-cat.png"
          alt="Oiia Cat"
          width={500}
          height={500}
          priority
        />
      )}

      {/* 밈 이미지 (GIF 재생 강제 초기화: key or src 변경) */}
      {showMeme && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <Image
            key={gifKey} // ✅ key 변경으로 이미지 다시 그림
            src={`/meme/oiia-cat-meme.gif?${gifKey}`} // ✅ gif 캐시 초기화용 query
            alt="Oiia Cat Meme"
            width={500}
            height={500}
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
