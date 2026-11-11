import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "AI Thực Chiến THPT Trung Phú — Thầy Nguyễn Trung Nguyên // Nền Tảng Giảng Dạy 100% AI",
  description: "Trường THPT Trung Phú (Củ Chi, TP.HCM) — Chuyên đề ứng dụng Trí tuệ Nhân tạo thực chiến 12 tiết do Thầy Nguyễn Trung Nguyên giảng dạy, nền tảng được kiến tạo hoàn toàn bằng AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased light" suppressHydrationWarning>
      <body className="min-h-full flex flex-col transition-colors duration-250">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
