import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConfirmDialogProvider } from "@/components/dialog/confirm-dialog-context";
import ConfirmDialogRenderer from "@/components/dialog/confirm-dialog-renderer";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { QueryProvider } from "@/components/query-provider";
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
  title: "Orinote",
  description: "Orinote 是一款简洁、高效的笔记软件，助您随时随地捕捉灵感、整理思绪。",
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
        <QueryProvider>
          <ConfirmDialogProvider>
            <SidebarProvider>
              <AppSidebar />
              <ConfirmDialogRenderer />
              <Toaster position="top-center" duration={1000} />
              <main className="h-screen flex flex-col flex-1">
                {children}
              </main>
            </SidebarProvider>
          </ConfirmDialogProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
