import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function getClientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ip = getClientIp(req);
  const time = body?.time ?? 0;

  if (time <= 0 || ip === "unknown") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const existing = await prisma.pressRecord.findUnique({ where: { ip } });

  if (!existing || time > existing.longestPress) {
    await prisma.pressRecord.upsert({
      where: { ip },
      update: { longestPress: time },
      create: { ip, longestPress: time },
    });
  }

  return NextResponse.json({ message: "Recorded" });
}

export async function GET() {
  const top = await prisma.pressRecord.findMany({
    orderBy: { longestPress: "desc" },
    take: 30,
  });

  return NextResponse.json(top);
}
