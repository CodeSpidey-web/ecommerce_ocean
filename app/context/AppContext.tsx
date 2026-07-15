"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../../types';

// ==========================================
// CART CONTEXT
// ==========================================
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  buyNow: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

// ==========================================
// WISHLIST CONTEXT
// ==========================================
interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};

// ==========================================
// COMPARE CONTEXT
// ==========================================
interface CompareContextType {
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
};

// ==========================================
// TOAST CONTEXT & TYPES
// ==========================================
export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

// ==========================================
// MAIN APP PROVIDERS WRAPPER
// ==========================================
export function AppProviders({ children }: { children: React.ReactNode }) {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // Compare State
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Toasts State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Hydration state check
  const [mounted, setMounted] = useState(false);

  // Initial load
  useEffect(() => {
    // Cart setup
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart storage", e);
      }
    }

    // Wishlist setup
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist storage", e);
      }
    }

    // Compare setup
    const savedCompare = localStorage.getItem('compare');
    if (savedCompare) {
      try {
        setCompareList(JSON.parse(savedCompare));
      } catch (e) {
        console.error("Failed to parse compare storage", e);
      }
    }

    setMounted(true);
  }, []);

  // Sync states to localstorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('compare', JSON.stringify(compareList));
  }, [compareList, mounted]);

  // Toast controls
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock === 'Out of Stock') {
      addToast(`Sorry, ${product.name} is currently out of stock.`, 'error');
      return;
    }

    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      addToast(`Updated ${product.name} quantity in Cart.`, 'success');
    } else {
      addToast(`Added ${product.name} to Cart.`, 'success');
    }

    setCart((prev) => {
      const isExisting = prev.some((item) => item.product.id === product.id);
      if (isExisting) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (item) {
      addToast(`Removed ${item.product.name} from Cart.`, 'info');
    }
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    addToast("Cleared shopping cart.", "info");
  };

  const buyNow = (product: Product) => {
    if (product.stock === 'Out of Stock') {
      addToast(`Sorry, ${product.name} is currently out of stock.`, 'error');
      return;
    }
    
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    setIsCartOpen(true);
    addToast(`Added ${product.name} and opened Cart.`, 'success');
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      addToast(`Removed ${product.name} from Wishlist.`, 'info');
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      addToast(`Added ${product.name} to Wishlist.`, 'success');
      setWishlist((prev) => [...prev, product]);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    addToast("Cleared wishlist.", "info");
  };

  // Compare operations
  const addToCompare = (product: Product) => {
    if (compareList.some((item) => item.id === product.id)) {
      addToast(`${product.name} is already in comparison list.`, 'info');
      return;
    }
    if (compareList.length >= 3) {
      addToast("You can compare up to 3 products at a time.", 'warning');
      return;
    }
    setCompareList((prev) => [...prev, product]);
    setIsCompareOpen(true);
    addToast(`Added ${product.name} to comparison list.`, 'success');
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== productId));
    addToast("Removed product from comparison.", 'info');
  };

  const isInCompare = (productId: string) => {
    return compareList.some((item) => item.id === productId);
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
    addToast("Cleared comparison list.", 'info');
  };

  // Computed values
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.08); // 8% sales tax
  const cartTotal = cartSubtotal + cartTax;

  return (
    <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          isCartOpen,
          setIsCartOpen,
          cartCount,
          cartSubtotal,
          cartTax,
          cartTotal,
          buyNow
        }}
      >
        <WishlistContext.Provider
          value={{
            wishlist,
            toggleWishlist,
            isInWishlist,
            isWishlistOpen,
            setIsWishlistOpen,
            clearWishlist
          }}
        >
          <CompareContext.Provider
            value={{
              compareList,
              addToCompare,
              removeFromCompare,
              isInCompare,
              isCompareOpen,
              setIsCompareOpen,
              clearCompare
            }}
          >
            <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
              {children}
            </ToastContext.Provider>
          </CompareContext.Provider>
        </WishlistContext.Provider>
      </CartContext.Provider>
  );
}
