import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./component/navbar";



export const metadata: Metadata = {
  title: "BetterUptime",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
          <Navbar/>
        {children}
      </body>
    </html>
  );
}
