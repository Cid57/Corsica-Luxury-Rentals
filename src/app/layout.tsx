import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Providers } from '@/app/providers';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

const ChatWindow = dynamic(() => import('@/components/chat/ChatWindow'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Corsica Luxury Rentals',
  description: 'Location de villas de luxe en Corse',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={playfair.className} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ChatWindow />
          </div>
        </Providers>
      </body>
    </html>
  );
}
