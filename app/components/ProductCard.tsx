"use client";

import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart, useWishlist, useCompare } from '../context/AppContext';
import { formatPrice } from '../../lib/products';
import Badge from './Badge';
import { Heart, ShoppingBag, Eye, Star, RefreshCw, Check, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  viewType?: 'grid' | 'list';
}

export default function ProductCard({
  product,
  viewType = 'grid'
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const favorited = isInWishlist(product.id);
  const compared = isInCompare(product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (compared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const isList = viewType === 'list';

  if (isList) {
    return (
      <div className="group relative flex flex-col sm:flex-row gap-6 p-5 bg-card border border-border/40 hover:border-primary/30 rounded-2xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
        {/* Left image column */}
        <div className="relative aspect-square w-full sm:w-56 bg-muted/10 rounded-xl overflow-hidden flex-shrink-0">
          <Link href={`/products?id=${product.id}`} className="relative block w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 224px"
            />
          </Link>
          
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-red-500/30">
              {product.discount}% OFF
            </div>
          )}
        </div>

        {/* Right Info Column */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                {product.brand} <span className="mx-1 opacity-50">•</span> {product.category} {product.sku && <><span className="mx-1 opacity-50">•</span> SKU: {product.sku}</>}
              </span>
              <Badge
                variant={
                  product.stock === 'In Stock'
                    ? 'success'
                    : product.stock === 'Low Stock'
                    ? 'warning'
                    : 'danger'
                }
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5"
              >
                {product.stock}
              </Badge>
            </div>

            <Link href={`/products?id=${product.id}`} className="block">
              <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors line-clamp-1 text-left">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center text-amber-400">
                <Star size={14} fill="currentColor" />
              </div>
              <span className="font-bold text-foreground">{product.rating}</span>
              <span className="text-muted-foreground text-xs">({product.reviewsCount} reviews)</span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed text-left">
              {product.description}
            </p>

            {/* Datasheet Link */}
            {product.datasheet && (
              <a
                href={product.datasheet}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-foreground hover:bg-primary mt-2 bg-primary/10 px-3 py-1.5 rounded-md transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FileText size={14} />
                <span>Datasheet PDF</span>
              </a>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-border/40">
            {/* Pricing */}
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground">{formatPrice(product.price)}</span>
              {product.oldPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCompareClick}
                className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                  compared
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                    : 'bg-card border-border/60 hover:bg-muted text-muted-foreground'
                }`}
                title={compared ? "Remove from comparison" : "Add to comparison"}
              >
                {compared ? <Check size={16} /> : <RefreshCw size={16} />}
              </button>

              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="p-2.5 rounded-xl border border-border/60 hover:bg-muted hover:text-foreground text-muted-foreground transition-all hover:scale-105 active:scale-95"
                title="Quick View"
              >
                <Eye size={16} />
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                  favorited
                    ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20'
                    : 'bg-card border-border/60 hover:bg-muted text-muted-foreground'
                }`}
                title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={16} fill={favorited ? 'currentColor' : 'none'} />
              </button>

              {product.stock !== 'Out of Stock' ? (
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 text-sm font-bold rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95 ml-2"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <span className="text-xs text-red-500 bg-red-500/10 px-3 py-1.5 rounded-md font-black uppercase tracking-wider ml-2">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>

        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      </div>
    );
  }

  // Standard Grid Card (default)
  return (
    <div className="group relative bg-card border border-border/40 hover:border-primary/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
      {/* Image area */}
      <div className="relative w-full bg-muted/10 overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <Link href={`/products?id=${product.id}`} className="relative block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Discount badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-red-500/30">
            {product.discount}% OFF
          </div>
        )}

        {/* Stock badge */}
        {product.stock === 'Low Stock' && (
          <div className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-amber-500/30">
            Low Stock
          </div>
        )}

        {/* Hover action buttons */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border backdrop-blur-md transition-all hover:scale-110 active:scale-90 ${
              favorited
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white/90 text-foreground hover:bg-rose-500 hover:text-white border-white/50 hover:border-rose-500'
            }`}
            title={favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={14} fill={favorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 text-foreground hover:bg-primary hover:text-white shadow-lg border border-white/50 hover:border-primary backdrop-blur-md transition-all hover:scale-110 active:scale-90"
            title="Quick View"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={handleCompareClick}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border backdrop-blur-md transition-all hover:scale-110 active:scale-90 ${
              compared
                ? 'bg-primary text-white border-primary'
                : 'bg-white/90 text-foreground hover:bg-primary hover:text-white border-white/50 hover:border-primary'
            }`}
            title={compared ? 'Remove from Comparison' : 'Compare'}
          >
            {compared ? <Check size={14} /> : <RefreshCw size={14} />}
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3 text-left">
        {/* Brand & SKU row */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider truncate">
            {product.brand} <span className="mx-1 opacity-50">•</span> {product.category}
          </span>
        </div>

        {/* Name */}
        <Link href={`/products?id=${product.id}`} className="block">
          <h3 className="font-bold text-foreground hover:text-primary transition-colors text-[15px] leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Datasheet */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs">
            <Star size={12} fill="currentColor" className="text-amber-400" />
            <span className="font-bold text-foreground">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewsCount})</span>
          </div>
          {product.datasheet && (
            <a
              href={product.datasheet}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:text-primary-foreground hover:bg-primary bg-primary/10 px-2 py-1 rounded-md transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText size={10} />
              <span>Datasheet</span>
            </a>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-1">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-foreground">{formatPrice(product.price)}</span>
            </div>
            {product.oldPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          {product.stock !== 'Out of Stock' ? (
            <button
              onClick={() => addToCart(product, 1)}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 px-4 py-2 text-xs font-bold rounded-xl shadow-lg shadow-primary/25 transition-all duration-200"
              title="Add to Cart"
            >
              <ShoppingBag size={14} />
              <span>Add</span>
            </button>
          ) : (
            <span className="text-[10px] text-red-500 bg-red-500/10 px-2 py-1 rounded-md font-black uppercase tracking-wider">Sold Out</span>
          )}
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}
