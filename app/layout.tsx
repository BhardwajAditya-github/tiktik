import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "TickTick – PDF Mock Test Builder",
    template: "%s | TickTick",
  },
  description:
    "Create, attempt, and review PDF-based mock tests. Upload question papers, track your progress, and practice efficiently.",

  keywords: [
    "mock test",
    "PDF mock test",
    "exam practice",
    "online test",
    "question paper",
    "test builder",
    "MCQ practice",
    "competitive exams",
    "SSC",
    "CGL",
    "UPSC",
    "bank exams",
  ],

  authors: [{ name: "TickTick" }],
  creator: "TickTick",
  publisher: "TickTick",

  applicationName: "TickTick",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "TickTick – PDF Mock Test Builder",
    description:
      "Upload PDFs, create mock tests, attempt exams, and analyze your performance.",
    type: "website",
    locale: "en_US",
    siteName: "TickTick",
  },

  twitter: {
    card: "summary_large_image",
    title: "TickTick – PDF Mock Test Builder",
    description: "Create and attempt PDF-based mock tests online.",
  },

  category: "Education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
