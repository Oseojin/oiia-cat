// 📁 app/page.tsx (또는 메인 화면 파일)
import HoldableOiiaCat from "@/components/HoldableOiiaCat";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <HoldableOiiaCat />
    </main>
  );
}
