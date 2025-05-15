import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BaseProviders } from "@/providers/base.providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextjs Template",
  description:
    "Nextjs Template already setup with TailwindCSS, Shadcn UI, and Native authentication system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <BaseProviders>{children}</BaseProviders>
      </body>
    </html>
  );
}
