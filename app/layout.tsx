// 📁 app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OIIACAT",
  description: "오이야캣의 세상에 오신 걸 환영합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* ✅ 중앙 고정 타이틀 */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 pointer-events-none z-50">
          <h1 className="text-4xl font-bold text-black/10 tracking-widest select-none">
            OIIACAT
          </h1>
        </div>

        {/* 실제 페이지 콘텐츠 */}
        {children}
      </body>
    </html>
  );
}
