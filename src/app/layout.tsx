import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: "EME Education - Best SAP Training Institute in Kerala | Placement Support",
  description: "Join EME Education, Kerala's leading SAP training institute. Get certified in SAP FICO, MM, SD, ABAP with 100% placement assistance. Book free career guidance webinar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
