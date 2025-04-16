"use client";

import { useEffect, useState } from "react";

type PressRecord = {
  ip: string;
  longestPress: number;
};

type Props = {
  refreshSignal: number;
};

export default function PressRanking({ refreshSignal }: Props) {
  const [records, setRecords] = useState<PressRecord[]>([]);
  const [myIp, setMyIp] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ip")
      .then((res) => res.json())
      .then((data) => setMyIp(data.ip))
      .catch(() => setMyIp(null));
  }, []);

  useEffect(() => {
    fetch("/api/press")
      .then((res) => res.json())
      .then(setRecords);
  }, [refreshSignal]);

  const maskIp = (ip: string, isMe: boolean) => {
    if (isMe) return ip;
    const parts = ip.split(".");
    if (parts.length !== 4) return "***.***.***.***";
    return `${parts[0]}.***.***.${parts[3]}`;
  };

  return (
    <div className="absolute bottom-0 text-sm w-full text-center">
      <h2 className="font-bold">TOP 10</h2>
      <ul className="text-xs mt-1">
        {records.map((r, i) => {
          const isMe = r.ip === myIp;
          return (
            <li
              key={r.ip}
              className={
                isMe ? "text-amber-400 font-semibold" : "text-gray-300"
              }
            >
              #{i + 1} - {maskIp(r.ip, isMe)} -{" "}
              {(r.longestPress / 1000).toFixed(1)}sec
              {isMe && " ← you"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
