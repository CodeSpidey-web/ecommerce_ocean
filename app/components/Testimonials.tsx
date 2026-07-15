"use client";

import React from 'react';
import { testimonials } from '../../lib/products';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

export default function Testimonials() {
 const activeTestimonials = testimonials.filter((t) => t.featured || t.id !== 't4'); // Show top three reviews

 return (
 <section className="py-24 bg-muted/5 relative z-10 border-t border-border/20">
 <div className="max-w-7xl mx-auto px-4 md:px-8">
 
 <SectionTitle
 title="Customer Testimonials"
 subtitle="Don't just take our word for it. Hear from creators and engineers who choose our store."
 badge="Social Proof"
 />

 {/* 3-Column Reviews Grid */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
 {activeTestimonials.slice(0, 3).map((item) => (
 <div
 key={item.id}
 className="group relative p-6 md:p-7 rounded-[28px] bg-card border border-border/40 hover:border-primary/20 shadow-xl glass-panel hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between text-left"
 >
 {/* Translucent Quote Overlay in Background */}
 <Quote className="absolute top-6 right-6 text-primary/5 w-14 h-14 rotate-180 pointer-events-none group-hover:scale-105 transition-transform duration-300" />
 
 <div className="space-y-4">
 {/* Rating Stars */}
 <div className="flex items-center gap-0.5 text-amber-500">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star
 key={i}
 size={13}
 fill={i < Math.floor(item.rating) ? 'currentColor' : 'none'}
 className={i < Math.floor(item.rating) ? '' : 'text-muted-foreground/30'}
 />
 ))}
 </div>

 {/* Comment Text */}
 <p className="text-xs md:text-sm text-muted-foreground italic font-light leading-relaxed">
 &ldquo;{item.comment}&rdquo;
 </p>
 </div>

 {/* User Bio Card */}
 <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/20">
 <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-primary/20 shadow-inner flex-shrink-0">
 <Image
 src={item.avatar}
 alt={item.name}
 fill
 className="object-cover"
 sizes="44px"
 />
 </div>
 <div className="flex flex-col min-w-0">
 <h4 className="text-xs font-black text-foreground truncate leading-none">{item.name}</h4>
 <span className="text-[9px] uppercase font-bold text-primary tracking-wider mt-1.5 truncate">
 {item.role}
 </span>
 </div>
 </div>
 </div>
 ))}
 </div>

 </div>
 </section>
 );
}
