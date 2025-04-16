"use client";

import { useEffect, useState } from "react";

type PressRecord = {
  ip: string;
  total: number;
};

export default function PressRanking() {
  const [records, setRecords] = useState<PressRecord[]>([]);

  useEffect(() => {
    fetch("/api/press")
      .then((res) => res.json())
      .then(setRecords);
  }, []);

  return (
    <div className="absolute bottom-4 text-sm w-full text-center">
      <h2 className="font-bold">TOP 30</h2>
      <ul className="text-xs mt-1">
        {records.map((r, i) => (
          <li key={r.ip}>
            #{i + 1} - {r.ip} - {(r.total / 1000).toFixed(1)}sec
          </li>
        ))}
      </ul>
    </div>
  );
}
