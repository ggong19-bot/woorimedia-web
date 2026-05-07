import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "우리미디어 — 한정판 무손실 음원의 새로운 정의",
  description:
    "USB 1개로 인증, 어디서든 재생, 평생 소장. 음반사·기획사 한정판 발주 통합 솔루션.",
  metadataBase: new URL("https://woorimedia.com"),
  openGraph: {
    title: "우리미디어",
    description: "한정판 무손실 음원의 새로운 정의",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-text antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
