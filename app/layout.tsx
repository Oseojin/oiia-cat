import ClientIP from "@/components/ClientIP";
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
        <div className="absolute top-4 w-full flex flex-col items-center z-10">
          <div className="text-3xl font-bold">OIIACAT</div>
          <ClientIP />
        </div>
        {children}
      </body>
    </html>
  );
}
