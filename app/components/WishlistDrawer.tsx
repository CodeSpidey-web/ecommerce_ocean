"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist, useCart } from '../context/AppContext';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../lib/products';
import Image from 'next/image';
import Button from './Button';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    clearWishlist
  } = useWishlist();
  
  const { addToCart } = useCart();

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsWishlistOpen(false);
    };
    if (isWishlistOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    // Remove from wishlist
    toggleWishlist(product);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md h-full bg-card shadow-2xl border-l border-border/40 z-10 flex flex-col justify-between glass-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Heart className="text-rose-500 w-5 h-5 fill-current" />
                <h3 className="text-lg font-bold text-foreground">Your Favorites</h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/80 transition-colors"
                aria-label="Close favorites list"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center text-rose-500/60">
                    <Heart size={28} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">Your wishlist is empty</h4>
                    <p className="text-sm text-muted-foreground max-w-[240px] mt-1 mx-auto">
                      Tap the heart icon on any product to save your favorite electronic gear!
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 rounded-[20px]"
                    onClick={() => setIsWishlistOpen(false)}
                  >
                    Explore Products
                  </Button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-3 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/20 transition-colors relative group"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border/30 bg-muted/30 flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-foreground line-clamp-1 pr-6">
                          {product.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">{product.brand}</span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-black text-foreground">
                          {formatPrice(product.price)}
                        </span>

                        {product.stock !== 'Out of Stock' ? (
                          <Button
                            variant="primary"
                            size="sm"
                            className="px-3 py-1.5 text-xs gap-1 rounded-[20px]"
                            onClick={() => handleMoveToCart(product)}
                          >
                            <ShoppingBag size={12} />
                            To Cart
                          </Button>
                        ) : (
                          <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {wishlist.length > 0 && (
              <div className="p-6 border-t border-border/40 bg-muted/10 flex gap-3">
                <Button
                  variant="outline"
                  className="w-full rounded-[20px]"
                  onClick={clearWishlist}
                >
                  Clear All Items
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
