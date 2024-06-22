import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Nunito} from "next/font/google"
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";

const font = Nunito(
  {
    subsets: ["latin"],
  }
)

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar/>
        </ClientOnly>
        {children}
        </body>
    </html>
  );
}
