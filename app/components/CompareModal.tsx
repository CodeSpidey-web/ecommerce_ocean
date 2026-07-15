"use client";

import React from 'react';
import { useCompare, useCart } from '../context/AppContext';
import Modal from './Modal';
import { formatPrice } from '../../lib/products';
import Image from 'next/image';
import Button from './Button';
import { Star, ShoppingBag, Trash2 } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareModal({ isOpen, onClose }: CompareModalProps) {
  const { compareList, removeFromCompare } = useCompare();
  const { addToCart } = useCart();

  // Combine all specification keys from all compared products
  const allSpecKeys = Array.from(
    new Set(
      compareList.flatMap((product) => Object.keys(product.specifications || {}))
    )
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Comparison" size="xl">
      {compareList.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No products selected for comparison.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="p-4 text-left font-bold text-muted-foreground w-1/4">Product Specifications</th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 text-left w-1/4 min-w-[200px] relative group">
                    <div className="flex flex-col gap-3">
                      {/* Close button to remove from list */}
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 transition-colors p-1"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 size={14} />
                      </button>

                      {/* Product Image */}
                      <div className="relative aspect-square w-24 h-24 mx-auto rounded-lg overflow-hidden border border-border/30 bg-muted/20">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product details */}
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
                          {product.brand}
                        </span>
                        <h4 className="font-extrabold text-foreground line-clamp-2 mt-1 min-h-[40px]">
                          {product.name}
                        </h4>
                        
                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1 mt-1.5">
                          <Star size={12} fill="currentColor" className="text-amber-500" />
                          <span className="text-xs font-semibold text-foreground">{product.rating}</span>
                          <span className="text-[10px] text-muted-foreground">({product.reviewsCount})</span>
                        </div>

                        {/* Price */}
                        <div className="text-base font-black text-foreground mt-1">
                          {formatPrice(product.price)}
                        </div>
                      </div>

                      {/* Add to cart */}
                      {product.stock !== 'Out of Stock' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full gap-1 text-xs py-2 rounded-[20px]"
                          onClick={() => {
                            addToCart(product, 1);
                          }}
                        >
                          <ShoppingBag size={12} />
                          Add to Cart
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled className="w-full text-xs py-2 rounded-[20px]">
                          Out of Stock
                        </Button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price row */}
              <tr className="border-b border-border/40 hover:bg-muted/10 transition-colors">
                <td className="p-4 font-bold text-foreground">Price</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-foreground font-black text-lg">
                    {formatPrice(product.price)}
                  </td>
                ))}
              </tr>
              
              {/* Rating row */}
              <tr className="border-b border-border/40 hover:bg-muted/10 transition-colors">
                <td className="p-4 font-bold text-foreground">Rating</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-foreground">
                    <span className="font-semibold">{product.rating}</span> / 5.0 ({product.reviewsCount} Reviews)
                  </td>
                ))}
              </tr>

              {/* Category row */}
              <tr className="border-b border-border/40 hover:bg-muted/10 transition-colors">
                <td className="p-4 font-bold text-foreground">Category</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-foreground">
                    {product.category}
                  </td>
                ))}
              </tr>

              {/* Specifications rows dynamically mapped */}
              {allSpecKeys.map((key) => (
                <tr key={key} className="border-b border-border/40 hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-bold text-foreground capitalize">{key}</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-muted-foreground">
                      {product.specifications[key] || <span className="text-muted-foreground/40 italic">N/A</span>}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Warranty row */}
              <tr className="border-b border-border/40 hover:bg-muted/10 transition-colors">
                <td className="p-4 font-bold text-foreground">Warranty</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-muted-foreground">
                    {product.warranty}
                  </td>
                ))}
              </tr>

              {/* Delivery row */}
              <tr className="hover:bg-muted/10 transition-colors">
                <td className="p-4 font-bold text-foreground">Delivery</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-muted-foreground">
                    {product.deliveryInfo}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
