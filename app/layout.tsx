import '../styles/globals.css';
import { ReactNode } from 'react';
import { Poppins, Lato, Roboto } from 'next/font/google';

export const metadata = {
  title: 'CLASSA – Empowering Institutions',
  description: 'A next-generation EdTech ecosystem with smart learning, teaching, and management tools.',
};

// Configure the Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

// Configure the Lato font
const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

// Configure the Roboto font
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable} ${roboto.variable} font-sans`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
