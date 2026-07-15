"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, ShoppingBag, Heart, User, MapPin } from 'lucide-react';
import { useCart, useWishlist } from '../context/AppContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  // Close when path changes
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Disable scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xs h-full bg-card shadow-2xl border-l border-border/40 z-10 flex flex-col justify-between p-6 glass-panel"
          >
            {/* Top Row: Close */}
            <div className="flex items-center justify-between pb-6 border-b border-border/40">
              <span className="font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tighter text-xs">
                OCEAN STUDENT PROJECTS
              </span>
              <button
                onClick={onClose}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/80 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Middle Nav Links */}
            <nav className="flex-1 py-8 flex flex-col gap-6">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-bold transition-colors ${
                      isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions and Info */}
            <div className="border-t border-border/40 pt-6 space-y-6">
              <div className="grid grid-cols-3 gap-2">
                {/* Account */}
                <button className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted/30 hover:bg-muted transition-colors">
                  <User size={16} className="text-muted-foreground" />
                  <span className="text-[9px] font-semibold text-foreground">Profile</span>
                </button>

                {/* Favorites */}
                <button className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted/30 hover:bg-muted transition-colors relative">
                  <Heart size={16} className="text-muted-foreground" />
                  <span className="text-[9px] font-semibold text-foreground">Favorites</span>
                  {wishlist.length > 0 && (
                    <span className="absolute top-1.5 right-4 bg-rose-500 text-white font-extrabold text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted/30 hover:bg-muted transition-colors relative">
                  <ShoppingBag size={16} className="text-muted-foreground" />
                  <span className="text-[9px] font-semibold text-foreground">Bag</span>
                  {cartCount > 0 && (
                    <span className="absolute top-1.5 right-5 bg-primary text-white font-extrabold text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Office Details */}
              <div className="flex gap-2 text-[10px] text-muted-foreground bg-muted/20 p-3 rounded-xl">
                <MapPin size={12} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-foreground mb-0.5">Ocean Student Projects</div>
                  <div>Whitefield, Bengaluru, India</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
