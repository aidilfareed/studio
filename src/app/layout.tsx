import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter as FontSans } from "next/font/google"
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Vibe Coding Course - Build & Ship Your MVP in 30 Days',
  description: 'Join a guided, project-based course to build a production-ready application from scratch. Master the modern stack and launch your idea.',
  openGraph: {
    title: 'Vibe Coding Course - Build & Ship Your MVP in 30 Days',
    description: 'Join a guided, project-based course to build a production-ready application from scratch. Master the modern stack and launch your idea.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={cn("h-full bg-background font-sans antialiased", fontSans.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
