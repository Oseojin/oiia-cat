"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import PressRanking from "./PressRanking";

export default function OiiaCatClient() {
  const [isTouching, setIsTouching] = useState(false);
  const [pressTime, setPressTime] = useState(0);
  const [gifKey, setGifKey] = useState(Date.now());
  const [refreshSignal, setRefreshSignal] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const sendPressTime = async (ms: number) => {
    try {
      await fetch("/api/press", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time: ms }),
      });
    } catch (err) {
      console.error("시간 전송 실패: ", err);
    }
  };

  const startPress = () => {
    if (isTouching) return;
    setIsTouching(true);
    setGifKey(Date.now());

    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    }

    intervalRef.current = setInterval(() => {
      setPressTime((prev) => prev + 1);
    }, 100);
  };

  const endPress = () => {
    if (!isTouching) return;
    setIsTouching(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (soundRef.current) {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
    }

    const totalTime = pressTime * 100;
    if (totalTime > 0) {
      sendPressTime(totalTime).then(() => {
        setRefreshSignal(Date.now());
      });
    }
    setPressTime(0);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full"
      onMouseDown={(e) => e.button === 0 && startPress()}
      onMouseUp={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
    >
      {/* 누른 시간 표시 */}
      {isTouching && (
        <div className="absolute top-30 text-center text-xl z-10">
          {(pressTime / 10).toFixed(1)}
        </div>
      )}

      {/* 고양이 이미지 or gif */}
      <div className="relative">
        {isTouching ? (
          <Image
            key={gifKey}
            src="/oiia-meme.gif"
            alt="Oiia Meme"
            width={500}
            height={500}
            unoptimized
            draggable={false}
            className="pointer-events-none select-none"
          />
        ) : (
          <Image
            src="/oiia-idle.png"
            alt="Oiia Idle"
            width={500}
            height={500}
            priority
            draggable={false}
            className="pointer-events-none select-none"
          />
        )}
      </div>

      <PressRanking refreshSignal={refreshSignal} />

      {/* 반복 재생되는 사운드 */}
      <audio ref={soundRef} src="/sound/oiia-meme.mp3" preload="auto" loop />
    </div>
  );
}
