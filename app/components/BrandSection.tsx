"use client";

import React from 'react';
import { motion } from 'framer-motion';

const BRANDS = [
  { name: 'Arduino', style: 'font-sans uppercase font-black tracking-tight text-teal-600' },
  { name: 'Raspberry Pi', style: 'font-mono uppercase font-black tracking-widest text-rose-600' },
  { name: 'Espressif', style: 'font-sans uppercase font-extrabold tracking-wider text-sky-600' },
  { name: 'STMicro', style: 'font-serif uppercase font-black tracking-tight text-red-600' },
  { name: 'DJI', style: 'font-sans uppercase font-black tracking-tighter text-slate-800' },
  { name: 'Creality', style: 'font-sans uppercase font-bold tracking-wide text-orange-600' },
  { name: 'Pololu', style: 'font-mono font-bold tracking-wider text-emerald-600' },
  { name: 'Adafruit', style: 'font-sans font-black italic text-cyan-600' }
];

export default function BrandSection() {
  return (
    <section className="py-12 border-y border-border/40 bg-muted/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Carousel Grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center opacity-60">
          {BRANDS.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`text-sm md:text-base cursor-pointer select-none font-bold text-center tracking-wide text-foreground/80 hover:text-foreground transition-all duration-300 ${brand.style}`}
            >
              {brand.name}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
