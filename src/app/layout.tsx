import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Nunito} from "next/font/google"
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import Modal from "@/components/modals/Modal";
import RegisterModal from "@/components/modals/RegisterModal";

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
          {/* <Modal isOpen={true} title="hello World" actionLabel="Submit"/> */}
          <RegisterModal/>
          <Navbar/>
        </ClientOnly>
        {children}
        </body>
    </html>
  );
}
