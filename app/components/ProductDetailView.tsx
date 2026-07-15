"use client";

import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { products, formatPrice } from '../../lib/products';
import { useCart, useWishlist } from '../context/AppContext';
import { trackProductView } from './RecentlyViewed';
import Viewer360 from './Viewer360';
import Breadcrumb from './Breadcrumb';
import Badge from './Badge';
import Button from './Button';
import ProductCard from './ProductCard';
import RecentlyViewed from './RecentlyViewed';
import { Star, Heart, ShoppingBag, CreditCard, RotateCcw, ShieldCheck, Truck, ListCollapse, Layers, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailViewProps {
 productId: string;
}

export default function ProductDetailView({ productId }: ProductDetailViewProps) {
 const { addToCart, buyNow } = useCart();
 const { toggleWishlist, isInWishlist } = useWishlist();

 const [product, setProduct] = useState<Product | null>(null);
 const [activeImage, setActiveImage] = useState('');
 const [quantity, setQuantity] = useState(1);
 const [viewMode, setViewMode] = useState<'standard' | 'viewer360'>('standard');

 useEffect(() => {
 const found = products.find((p) => p.id === productId);
 if (found) {
 setProduct(found);
 setActiveImage(found.images[0]);
 setQuantity(1);
 setViewMode('standard');
 trackProductView(found.id);
 } else {
 setProduct(null);
 }
 }, [productId]);

 if (!product) {
 return (
 <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center space-y-4">
 <h2 className="text-2xl font-bold text-foreground">Product Not Found</h2>
 <p className="text-muted-foreground text-sm max-w-sm mx-auto">
 Sorry, the electronic gear you are looking for does not exist in our catalog.
 </p>
 <Link href="/products">
 <Button variant="primary" className="rounded-[20px] mt-2">
 Back to Catalog
 </Button>
 </Link>
 </div>
 );
 }

 const favorited = isInWishlist(product.id);
 
 // Related products (same category/brand, excluding current product)
 const relatedProducts = products
 .filter((p) => (p.category === product.category || p.brand === product.brand) && p.id !== product.id)
 .slice(0, 4);

 return (
 <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10 text-left">
 {/* Breadcrumb Trail */}
 <Breadcrumb
 items={[
 { label: 'Products', href: '/products' },
 { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
 { label: product.name }
 ]}
 className="mb-8"
 />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
 {/* Left Side: Images & 360 viewer */}
 <div className="lg:col-span-7 flex flex-col gap-6">
 {/* Switch Tab controls */}
 <div className="flex gap-2 bg-muted/40 p-1 rounded-xl self-start">
 <button
 onClick={() => setViewMode('standard')}
 className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
 viewMode === 'standard'
 ? 'bg-primary text-white shadow-sm'
 : 'text-muted-foreground hover:text-foreground'
 }`}
 >
 Gallery View
 </button>
 <button
 onClick={() => setViewMode('viewer360')}
 className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
 viewMode === 'viewer360'
 ? 'bg-primary text-white shadow-sm'
 : 'text-muted-foreground hover:text-foreground'
 }`}
 >
 <RotateCcw size={12} />
 Interactive 360°
 </button>
 </div>

 {viewMode === 'standard' ? (
 <div className="flex flex-col-reverse md:flex-row gap-6 items-start">
 {/* Premium Vertical Thumbnails (Desktop) / Horizontal (Mobile) */}
 {product.images.length > 1 && (
 <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 pb-2 md:pb-0 pr-1 max-h-[480px]">
 {product.images.map((img, idx) => (
 <button
 key={idx}
 onClick={() => setActiveImage(img)}
 className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 bg-card transition-all ${
 (activeImage || product.images[0]) === img
 ? 'border-primary shadow-md scale-95'
 : 'border-border/40 hover:border-muted-foreground/60'
 }`}
 >
 <Image
 src={img}
 alt={`${product.name} gallery ${idx}`}
 fill
 className="object-contain p-2"
 sizes="96px"
 />
 </button>
 ))}
 </div>
 )}

 {/* Main Image display */}
 <div className="flex-1 relative aspect-[4/3] w-full rounded-[24px] overflow-hidden border border-border/45 bg-card/60 backdrop-blur-md p-4 shadow-xl glass-panel flex items-center justify-center">
 <div className="relative w-[90%] h-[90%]">
 <Image
 src={activeImage || product.images[0]}
 alt={product.name}
 fill
 className="object-contain transition-transform duration-500 hover:scale-105"
 sizes="(max-width: 768px) 100vw, 50vw"
 priority
 />
 </div>
 
 {product.discount > 0 && (
 <Badge variant="danger" className="absolute top-6 right-6">
 {product.discount}% OFF
 </Badge>
 )}
 </div>
 </div>
 ) : (
 /* Interactive 360 viewer */
 <Viewer360 product={product} />
 )}

 {/* Specifications list */}
 <div className="bg-card/70 border border-border/40 rounded-[24px] p-6 md:p-8 mt-4 glass-panel space-y-4 shadow-sm">
 <h3 className="font-extrabold text-base md:text-lg text-foreground border-b border-border/40 pb-3.5 flex items-center gap-2">
 <ListCollapse size={18} className="text-primary" />
 <span>Technical Specifications</span>
 </h3>
 
 <div className="border border-border/60 rounded-2xl overflow-hidden shadow-sm bg-card mt-2">
 <table className="w-full text-xs md:text-sm border-collapse">
 <tbody>
 {Object.entries(product.specifications).map(([key, val], idx) => (
 <tr 
 key={key} 
 className={`border-b border-border/30 last:border-0 transition-colors hover:bg-muted/5 ${
 idx % 2 === 0 ? 'bg-card' : 'bg-muted/15 '
 }`}
 >
 <td className="w-[30%] sm:w-[25%] p-3.5 font-bold text-muted-foreground bg-muted/5 border-r border-border/30 capitalize text-left">
 {key}
 </td>
 <td className="w-[70%] sm:w-[75%] p-3.5 text-foreground font-semibold text-left break-words">
 {val}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>

 {/* Right Side: Product Details & Purchase Actions */}
 <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
 <div className="space-y-4">
 {/* Top specs meta */}
 <div className="flex items-center justify-between">
 <span className="text-xs font-black uppercase tracking-wider text-primary">
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
 <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-[1.1] hover:text-primary transition-colors">
 {product.name}
 </h1>

 {/* Ratings */}
 <div className="flex items-center gap-1.5">
 <div className="flex items-center text-amber-500">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star
 key={i}
 size={15}
 fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
 className={i < Math.floor(product.rating) ? '' : 'text-muted/30'}
 />
 ))}
 </div>
 <span className="text-xs font-extrabold text-foreground">{product.rating}</span>
 <span className="text-[10px] text-muted-foreground font-semibold">({product.reviewsCount} verified reviews)</span>
 </div>

 {/* Price block */}
 <div className="flex items-baseline gap-3 pt-2">
 <span className="text-4xl font-black text-foreground">{formatPrice(product.price)}</span>
 {product.oldPrice > product.price && (
 <span className="text-lg text-muted-foreground line-through font-light">
 {formatPrice(product.oldPrice)}
 </span>
 )}
 </div>

 {/* Description */}
 <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light">
 {product.description}
 </p>

 {/* Datasheet Button */}
 {product.datasheet && (
 <a
 href={product.datasheet}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2 bg-primary/10 border border-primary/20 hover:bg-primary text-primary hover:text-white px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all w-full select-none"
 >
 <FileText size={14} />
 <span>Download Product Datasheet</span>
 </a>
 )}

 {/* Highlights list */}
 {product.features && product.features.length > 0 && (
 <div className="space-y-2.5 pt-3">
 <span className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
 <Layers size={14} className="text-primary" />
 Highlight Features
 </span>
 <ul className="grid grid-cols-1 gap-2 text-xs text-muted-foreground font-light pl-1">
 {product.features.map((feat, idx) => (
 <li key={idx} className="flex items-start gap-2">
 <span className="text-primary mt-0.5">•</span>
 <span>{feat}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>

 {/* Amazon/Flipkart Styled Checkout Sidebar Box */}
 <div className="p-5 md:p-6 bg-card border border-border/60 rounded-2xl shadow-sm space-y-5">
 
 {/* Dynamic Total Price */}
 <div className="space-y-1">
 <span className="text-xs text-muted-foreground block font-bold">Total Price:</span>
 <div className="flex items-baseline gap-2">
 <span className="text-2xl font-black text-foreground">{formatPrice(product.price * quantity)}</span>
 {quantity > 1 && (
 <span className="text-xs text-muted-foreground">
 ({formatPrice(product.price)} x {quantity})
 </span>
 )}
 </div>
 </div>

 {/* Availability Stock Tag */}
 <div className="text-xs font-extrabold">
 {product.stock === 'In Stock' ? (
 <span className="text-emerald-600 text-sm">In Stock.</span>
 ) : product.stock === 'Low Stock' ? (
 <span className="text-amber-600 text-sm">Only a few left in stock - order soon.</span>
 ) : (
 <span className="text-rose-600 text-sm font-bold uppercase">Out of Stock.</span>
 )}
 </div>

 {/* Quantity Selector Dropdown */}
 {product.stock !== 'Out of Stock' && (
 <div className="flex items-center justify-between text-xs sm:text-sm">
 <span className="font-semibold text-muted-foreground">Quantity:</span>
 <select 
 value={quantity} 
 onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
 className="bg-transparent border border-border/60 hover:border-muted-foreground/60 rounded-xl px-4 py-2 font-semibold text-foreground outline-none cursor-pointer text-xs"
 >
 {[1, 2, 3, 4, 5, 10, 25, 50].map((num) => (
 <option key={num} value={num} className="bg-card text-foreground">{num}</option>
 ))}
 </select>
 </div>
 )}

 {/* Checkout Action buttons */}
 <div className="flex flex-col gap-3 pt-2">
 {product.stock !== 'Out of Stock' ? (
 <>
 <Button
 variant="primary"
 size="lg"
 className="w-full rounded-2xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs font-bold py-4 shadow-md shadow-primary/10"
 onClick={() => addToCart(product, quantity)}
 >
 <ShoppingBag size={14} />
 <span>Add to Cart</span>
 </Button>
 <Button
 variant="secondary"
 size="lg"
 className="w-full rounded-2xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs font-bold py-4"
 onClick={() => buyNow(product)}
 >
 <CreditCard size={14} />
 <span>Buy Now</span>
 </Button>
 </>
 ) : (
 <Button variant="outline" size="lg" disabled className="w-full rounded-2xl">
 Out of Stock
 </Button>
 )}
 
 <Button
 variant={favorited ? 'accent' : 'outline'}
 size="lg"
 className="w-full rounded-2xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs font-bold py-3.5"
 onClick={() => toggleWishlist(product)}
 >
 <Heart size={14} fill={favorited ? 'currentColor' : 'none'} className={favorited ? 'text-rose-500' : ''} />
 <span>{favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
 </Button>
 </div>

 {/* Quick Guarantees stats */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[10px] sm:text-xs text-muted-foreground font-light leading-relaxed border-t border-border/30">
 <div className="flex items-center gap-2">
 <Truck size={14} className="text-primary flex-shrink-0" />
 <span>{product.deliveryInfo}</span>
 </div>
 <div className="flex items-center gap-2">
 <ShieldCheck size={14} className="text-primary flex-shrink-0" />
 <span>{product.warranty}</span>
 </div>
 </div>

 </div>
 </div>
 </div>

 {/* Related Products Showcase */}
 {relatedProducts.length > 0 && (
 <section className="mt-20 pt-10 border-t border-border/40">
 <h2 className="text-2xl font-black text-foreground tracking-tight mb-8">Related Components</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
 {relatedProducts.map((p) => (
 <ProductCard key={p.id} product={p} />
 ))}
 </div>
 </section>
 )}

 {/* Recently Viewed */}
 <div className="mt-8">
 <RecentlyViewed />
 </div>
 </main>
 );
}
