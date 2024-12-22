import "./globals.css";
import type { Metadata } from "next";
import { ParticleConnectkit } from "@/context/index";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "AI Agent KOL",
  description: "The Future of AI Agent KOL Marketing Starts Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ParticleConnectkit>
          <Header />
          {children}
        </ParticleConnectkit>
      </body>
    </html>
  );
}
