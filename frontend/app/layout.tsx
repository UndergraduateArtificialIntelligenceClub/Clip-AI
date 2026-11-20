import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clip-AI",
  description: "Find the best moments in long videos and turn them into short clips.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var t=localStorage.getItem("clip-ai-theme");document.documentElement.classList.toggle("dark",t? t==="dark":true)}catch(e){document.documentElement.classList.add("dark")}})();',
          }}
        />
      </head>
      <body className="min-h-full">
        <Navbar />
        <main className="mx-auto w-full max-w-[1240px] flex-1 px-5 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
