"use client";

import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { products } from '../../lib/products';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import { motion } from 'framer-motion';

// Helper function to add a product to recently viewed list
export function trackProductView(productId: string) {
  if (typeof window === 'undefined') return;
  const key = 'recently_viewed';
  const saved = localStorage.getItem(key);
  let list: string[] = [];
  if (saved) {
    try {
      list = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  // Remove duplicates and push to front
  list = list.filter((id) => id !== productId);
  list.unshift(productId);
  // Cap at 6 items
  list = list.slice(0, 6);
  localStorage.setItem(key, JSON.stringify(list));
}

interface RecentlyViewedProps {
  currentProductId?: string;
}

export default function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const key = 'recently_viewed';
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const ids: string[] = JSON.parse(saved);
        // Find products matching these IDs, excluding current product
        const filteredProducts = ids
          .map((id) => products.find((p) => p.id === id))
          .filter((p): p is Product => !!p && p.id !== currentProductId);
        setItems(filteredProducts);
      } catch (e) {
        console.error("Error parsing recently viewed", e);
      }
    }
  }, [currentProductId]);

  if (items.length === 0) return null;

  return (
    <section className="py-12 border-t border-border/40 mt-16 bg-muted/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title="Recently Viewed"
          subtitle="Continue where you left off. Browse items you recently looked at."
          align="left"
          className="mb-8"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
          {items.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* ProductCard component will be loaded from components/ProductCard */}
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
