import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ IP 추출 함수
function getClientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ✅ 누른 시간 저장
export async function POST(req: NextRequest) {
  const body = await req.json();
  const ip = getClientIp(req);
  const time = body?.time ?? 0;

  if (time <= 0 || ip === "unknown") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await prisma.pressRecord.upsert({
    where: { ip },
    update: { total: { increment: time } },
    create: { ip, total: time },
  });

  return NextResponse.json({ message: "Recorded" });
}

// ✅ TOP 30 조회
export async function GET() {
  const top = await prisma.pressRecord.findMany({
    orderBy: { total: "desc" },
    take: 30,
  });

  return NextResponse.json(top);
}
