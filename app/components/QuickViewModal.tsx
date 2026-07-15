"use client";

import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import Modal from './Modal';
import { formatPrice } from '../../lib/products';
import Badge from './Badge';
import Button from './Button';
import { useCart, useWishlist } from '../context/AppContext';
import { Heart, ShoppingBag, CreditCard, Star, RefreshCw, FileText } from 'lucide-react';
import Image from 'next/image';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose
}: QuickViewModalProps) {
  const { addToCart, buyNow } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick View" size="xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-border/40 bg-muted/30">
            <Image
              src={activeImage || product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-4 transition-all duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            {product.discount > 0 && (
              <Badge variant="danger" className="absolute top-4 left-4 z-10">
                {product.discount}% OFF
              </Badge>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    (activeImage || product.images[0]) === img
                      ? 'border-primary shadow-sm scale-95'
                      : 'border-border/40 hover:border-muted-foreground/60'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} gallery ${idx}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Category & Brand */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {product.brand} • {product.category} {product.sku && `• SKU: ${product.sku}`}
              </span>
              <Badge
                variant={
                  product.stock === 'In Stock'
                    ? 'success'
                    : product.stock === 'Low Stock'
                    ? 'warning'
                    : 'danger'
                }
              >
                {product.stock}
              </Badge>
            </div>

            {/* Title */}
            <h2 className="text-xl font-extrabold text-foreground">{product.name}</h2>

            {/* Rating & Datasheet */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 text-xs text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="font-bold text-foreground">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewsCount} reviews)</span>
              </div>
              
              {product.datasheet && (
                <a
                  href={product.datasheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <FileText size={12} />
                  <span>Datasheet PDF</span>
                </a>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-foreground">{formatPrice(product.price)}</span>
              {product.oldPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through font-light">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Key Specs */}
            {product.specifications && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] bg-muted/30 p-3 rounded-xl border border-border/30">
                {Object.entries(product.specifications).slice(0, 4).map(([key, val]) => (
                  <div key={key} className="truncate">
                    <span className="font-bold text-muted-foreground capitalize">{key}: </span>
                    <span className="text-foreground font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-border/40">
            {/* Quantity Selector */}
            {product.stock !== 'Out of Stock' && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Quantity
                </span>
                <div className="flex items-center border border-border/60 rounded-full bg-muted/30">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-foreground hover:bg-muted/80 rounded-full transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-semibold text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-foreground hover:bg-muted/80 rounded-full transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {product.stock !== 'Out of Stock' ? (
                <>
                  <Button
                    variant="primary"
                    className="flex-1 gap-2 rounded-[20px]"
                    onClick={() => {
                      addToCart(product, quantity);
                      onClose();
                    }}
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="secondary"
                    className="flex-1 gap-2 rounded-[20px]"
                    onClick={() => {
                      buyNow(product);
                      onClose();
                    }}
                  >
                    <CreditCard size={18} />
                    Buy Now
                  </Button>
                </>
              ) : (
                <Button variant="outline" disabled className="w-full rounded-[20px]">
                  Out of Stock
                </Button>
              )}

              <Button
                variant={inWishlist ? 'accent' : 'outline'}
                className="p-3 sm:px-4 rounded-[20px] aspect-square flex-shrink-0"
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </Button>
            </div>

            {/* Details Footer */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground bg-muted/20 p-2.5 rounded-xl">
              <div>🛡️ {product.warranty}</div>
              <div>🚚 {product.deliveryInfo}</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
