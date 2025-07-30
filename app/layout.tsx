import '../styles/globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'CLASSA – Empowering Institutions',
  description: 'A next-generation EdTech ecosystem with smart learning, teaching, and management tools.',
};

// Configure the Inter font with all the weights and styles you need
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
