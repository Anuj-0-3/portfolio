import type { Metadata } from "next";
import { Geist, Alfa_Slab_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/comoponents/Navbar";
import Footer from "@/comoponents/Footer";
import CustomCursor from "@/comoponents/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-alfa-slab-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Anuj Singh — Fullstack Developer & AI Enthusiast",
  description: "Portfolio website showcasing Anuj Singh's projects, skills, and contact information. Built with Next.js, React, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en" className={`${geistSans.variable} ${alfaSlabOne.variable} font-[var(--font-geist-sans)]`}>
      <body >
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
