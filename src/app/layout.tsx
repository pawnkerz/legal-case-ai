import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal Case AI",
  description: "AI-powered legal research, case preparation, and self-help software."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
