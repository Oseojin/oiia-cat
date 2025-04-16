"use client";

import { useEffect, useState } from "react";

export default function ClientIP() {
  const [ip, setIp] = useState<string>("불러오는 중...");

  useEffect(() => {
    fetch("/api/ip")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("알 수 없음"));
  }, []);

  return (
    <div className="mt-2 text-center text-sm text-gray-400">Your IP: {ip}</div>
  );
}
