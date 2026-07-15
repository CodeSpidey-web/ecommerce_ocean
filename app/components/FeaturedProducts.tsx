"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../lib/products';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import Button from './Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type TabType = 'new' | 'bestseller' | 'trending';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<TabType>('new');

  // Filter lists dynamically from mock DB
  const newArrivals = products.slice(0, 8);
  const bestSellers = products.filter((p) => p.rating >= 4.9).slice(0, 8);
  const trending = products.filter((p) => p.discount >= 11).slice(0, 8);

  const tabLists = {
    new: newArrivals,
    bestseller: bestSellers,
    trending: trending
  };

  const currentProducts = tabLists[activeTab];

  return (
    <section className="py-20 bg-muted/5 relative z-10 border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <SectionTitle
          title="Premium Showcases"
          subtitle="Explore our top selections. Toggle between new releases, best-selling favorites, and high-discount trends."
          badge="Curated Gear"
        />

        {/* Tab Controls */}
        <div className="flex justify-center gap-2 mb-12">
          {(['new', 'bestseller', 'trending'] as TabType[]).map((tab) => {
            const labels = {
              new: 'New Arrivals',
              bestseller: 'Best Sellers',
              trending: 'Trending'
            };
            const isActive = activeTab === tab;
            
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all relative ${
                  isActive
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-primary rounded-full z-0 shadow-md shadow-primary/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{labels[tab]}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/products">
            <Button variant="outline" className="group gap-2 rounded-[20px]">
              <span>View All Products</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
