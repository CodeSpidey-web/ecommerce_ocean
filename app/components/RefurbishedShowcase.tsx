"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../lib/products';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

export default function RefurbishedShowcase() {
  // Filter for products that are certified refurbished
  const refurbishedItems = products.filter(
    (p) => p.id.startsWith('refurbished') || p.name.includes('[Refurbished]')
  );

  if (refurbishedItems.length === 0) return null;

  return (
    <section id="refurbished" className="py-20 bg-muted/5 relative z-10 border-t border-b border-border/20">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.015)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title="Certified Refurbished & Surplus"
          subtitle="Get original developer boards, 3D printers, and test tools at fractional costs. Tested, certified, and backed by our replacement warranties."
          badge="Save on Hardware"
        />

        {/* Grid display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {refurbishedItems.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View all surplus link */}
        <div className="flex justify-center mt-12">
          <Link href="/products?search=Refurbished">
            <Button variant="outline" className="group gap-2 rounded-[20px] text-xs font-bold uppercase tracking-wider py-3">
              <span>View All Surplus Stock</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
