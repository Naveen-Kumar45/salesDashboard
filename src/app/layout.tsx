import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northline | Sales overview",
  description: "A clear view of monthly sales performance from 2022 to 2024.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
