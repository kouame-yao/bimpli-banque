import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import { BlockedAccountAlert } from "../../components/alerts/BlockedAccountAlert";
import { color } from "../../components/color/ColorBtn";
import { UserInfo } from "../../components/userInfo/UserInfo";
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
  title: `${UserInfo.Banque}`,
  description: "Ma banque",
  icons: {
    icon: "/onglet.jpg", // ou .png, .svg
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/onglet.jpg" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={
          {
            "--theme": color.theme,
          } as React.CSSProperties
        }
      >
        <BlockedAccountAlert />
        {children}
      </body>
    </html>
  );
}
