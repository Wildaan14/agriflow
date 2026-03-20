import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriFlow | Jual Lebih Mahal, Panen Lebih Aman",
  description: "Platform digital untuk petani, pembeli, dan pemerintah demi ketahanan pangan nasional.",
};

import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/components/providers/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id">
        <body
          className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased font-sans`}
        >
          <QueryProvider>
            {children}
          </QueryProvider>
          {/* Midtrans Snap SDK */}
          <script 
            src="https://app.sandbox.midtrans.com/snap/snap.js" 
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-fake-key'}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
