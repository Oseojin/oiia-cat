import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OIIACAT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white w-screen h-screen overflow-hidden">
        {/* 최상단 타이틀 */}
        <div className="absolute top-4 w-full text-center text-3xl font-bold z-10">
          OIIACAT
        </div>
        {children}
      </body>
    </html>
  );
}
