"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useToast } from '../context/AppContext';
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard, MessageCircle } from 'lucide-react';
import { formatPrice } from '../../lib/products';
import Image from 'next/image';
import Button from './Button';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTax,
    cartTotal,
    clearCart
  } = useCart();
  
  const { addToast } = useToast();

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = "Hello, I would like to place an order:\n\n";
    cart.forEach((item) => {
      message += `${item.quantity}x ${item.product.name} - ${formatPrice(item.product.price * item.quantity)}\n`;
    });
    
    message += `\nSubtotal: ${formatPrice(cartSubtotal)}`;
    message += `\nEst. Tax (8%): ${formatPrice(cartTax)}`;
    message += `\nOrder Total: ${formatPrice(cartTotal)}`;

    const encodedMessage = encodeURIComponent(message);
    // Using the phone number from the contact page
    const phoneNumber = "919042686793"; 
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
                <ShoppingBag className="text-primary w-5 h-5" />
                <h3 className="text-lg font-bold text-foreground">Your Shopping Cart</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/80 transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground/60">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">Your cart is empty</h4>
                    <p className="text-sm text-muted-foreground max-w-[240px] mt-1 mx-auto">
                      Explore our products and add premium electronics to your bundle!
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 rounded-[20px]"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-3 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/20 transition-colors relative group"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border/30 bg-muted/30 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-foreground line-clamp-1 pr-6">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">{item.product.brand}</span>
                      </div>
                      
                      {/* Controls and Price */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-border/60 rounded-full bg-card">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-muted rounded-full transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-muted rounded-full transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-black text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Est. Tax (8%)</span>
                    <span className="font-semibold text-foreground">{formatPrice(cartTax)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border/40">
                    <span>Order Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-[20px]"
                    onClick={clearCart}
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-2 gap-2 rounded-[20px] bg-green-600 hover:bg-green-700 text-white border-green-600"
                    onClick={handleCheckout}
                  >
                    <MessageCircle size={16} />
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
