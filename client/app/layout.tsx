import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ReduxProvider,
  TanstackQueryProvider,
} from "@/store/provider";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/services/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlaySync | Book Sports Turfs",
  description:
    "Book sports turfs effortlessly with PlaySync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <ErrorBoundary>
          <TanstackQueryProvider>
            <ReduxProvider>
              {children}
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </ReduxProvider>
          </TanstackQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
