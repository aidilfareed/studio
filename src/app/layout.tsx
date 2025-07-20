import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
