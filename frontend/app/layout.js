import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ComparisonProvider } from '@/context/ComparisonContext';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'College Discovery Platform',
  description: 'Find and compare the best colleges for your future.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ComparisonProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
          </ComparisonProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
