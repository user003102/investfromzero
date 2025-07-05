import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "investfromzero",
  description: "Investment knowledge sharing website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ background: '#f8f9fa', color: '#222', minHeight: '100vh', margin: 0 }}>
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
            <span style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '0.02em' }}>investfromzero</span>
            <nav>
              <Link href="/" style={{ marginRight: '1.5rem', fontWeight: 500 }}>Home</Link>
              <Link href="/about" style={{ fontWeight: 500 }}>About</Link>
            </nav>
          </div>
        </header>
        <main style={{ minHeight: '70vh' }}>{children}</main>
        <footer style={{ background: '#fff', borderTop: '1px solid #e5e7eb', padding: '1rem 0', marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: '#666' }}>
          &copy; {new Date().getFullYear()} investfromzero. All rights reserved. | Contact: <a href="mailto:chakshing510@gmail.com" style={{ color: '#0070f3', textDecoration: 'none' }}>chakshing510@gmail.com</a>
        </footer>
      </body>
    </html>
  );
}
