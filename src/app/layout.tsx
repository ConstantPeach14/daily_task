import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'TaskFlow — Daily Task Manager',
  description: 'Organize your day and get things done with TaskFlow. Clean, modern, and intuitive productivity dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="font-sans min-h-full bg-[#f8fafc] text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
