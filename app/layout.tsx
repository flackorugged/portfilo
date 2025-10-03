import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/ui/error-boundary";
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
  title: {
    default: "PortFilo",
    template: "%s | PortFilo"
  },
  description: "A modern portfolio and social platform for the Filos",
  keywords: ["portfolio", "social", "trading", "investment"],
  authors: [{ name: "PortFilo Team" }],
  creator: "PortFilo",
  publisher: "PortFilo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "PortFilo",
    description: "A modern portfolio and social platform for the Filos",
    siteName: "PortFilo",
  },
  twitter: {
    card: "summary_large_image",
    title: "PortFilo",
    description: "A modern portfolio and social platform for the Filos",
    creator: "@portfilo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster 
          theme="dark" 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid #374151',
              color: '#ffffff',
            },
          }}
        />
      </body>
    </html>
  );
}
