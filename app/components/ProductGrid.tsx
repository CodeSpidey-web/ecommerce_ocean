"use client";

import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  viewType?: 'grid' | 'list';
}

export default function ProductGrid({
  products,
  viewType = 'grid'
}: ProductGridProps) {
  
  if (products.length === 0) return null;

  return (
    <div
      className={
        viewType === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewType={viewType} />
      ))}
    </div>
  );
}
