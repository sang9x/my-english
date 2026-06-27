import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MyEnglish — Học Từ Vựng Tiếng Anh",
    template: "%s | MyEnglish",
  },
  description:
    "Ứng dụng học từ vựng tiếng Anh tương tác qua Flashcard, Game Sắp xếp câu, và Gõ từ. Tự tạo bộ từ vựng và chia sẻ với bạn bè.",
  keywords: ["học tiếng Anh", "từ vựng", "flashcard", "TOEIC", "game học tiếng Anh"],
  authors: [{ name: "MyEnglish" }],
  openGraph: {
    title: "MyEnglish — Học Từ Vựng Tiếng Anh",
    description: "Học từ vựng tiếng Anh qua Flashcard và Game tương tác",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
