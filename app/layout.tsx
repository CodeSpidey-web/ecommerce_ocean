import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CompareBar from './components/CompareBar';
import ToastContainer from './components/Toast';
import WhatsAppButton from './components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Ocean Student Projects | Premium Robotics & Electronics Marketplace',
  description: "India's trusted marketplace for electronics components, robotics hardware, IoT modules, development boards, PCB prototyping, and 3D printing services.",
  keywords: ['robotics', 'electronics', 'arduino', 'raspberry pi', 'iot', 'pcb', '3d printing', 'india'],
  authors: [{ name: 'Ocean Student Projects' }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-primary/20">
        <AppProviders>
          {/* Top scroll bar */}
          <ScrollProgress />

          {/* Sticky Navbar */}
          <Navbar />

          {/* Core content wrapper */}
          <div className="flex-1 pt-24 md:pt-28 flex flex-col">
            {children}
          </div>

          {/* Floating shopping drawers */}
          <CartDrawer />
          <WishlistDrawer />
          
          {/* Floating compare toolbar */}
          <CompareBar />

          {/* Global toast notification system */}
          <ToastContainer />

          {/* Sticky back to top button */}
          <ScrollToTop />

          {/* Floating WhatsApp Chat */}
          <WhatsAppButton />

          {/* Global Footer */}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
