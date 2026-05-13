import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "우리미디어 — Studio audio. Cinema vision.",
  description:
    "원음 그대로, 시네마 그대로. USB 1개로 인증, 어디서든 재생, 평생 소장. 음반사·기획사 한정판 발주 통합 솔루션.",
  metadataBase: new URL("https://woorimedia.com"),
  themeColor: "#F6F4EF",
  icons: {
    icon: "/logo/woorimedia-mark-only.svg",
    apple: "/logo/woorimedia-mark-only.svg",
  },
  openGraph: {
    title: "우리미디어",
    description: "Studio audio. Cinema vision. · 원음 그대로, 시네마 그대로",
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
      <body
        className="min-h-screen antialiased"
        style={{
          background: "var(--woori-paper)",
          color: "var(--woori-ink)",
        }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
