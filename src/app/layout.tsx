import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ProviderContent from "@/redux/ProviderContent";  
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",  
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Football Managements',
  description: 'Manage football teams, players, matches, tournaments, schedules, standings, and statistics with an advanced football management platform.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderContent  >
          {children}
        </ProviderContent>
      </body>
    </html>
  );
}
