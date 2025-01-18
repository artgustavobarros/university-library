import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const bebasNeue = Bebas_Neue({
  variable: "--bebas-neue",
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a book borrowing university management solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
