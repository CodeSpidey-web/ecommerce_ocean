"use client";

import React from 'react';
import Link from 'next/link';
import Button from './components/Button';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-md space-y-6 relative z-10 select-none">
        {/* Animated tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-wider"
        >
          <Sparkles size={10} />
          <span>Error Code 404</span>
        </motion.div>

        {/* Big Code */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-8xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tighter"
        >
          404
        </motion.h1>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-foreground">Lost in Translation</h2>
          <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed max-w-xs mx-auto">
            The page you are looking for does not exist or has been relocated to another workspace node.
          </p>
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
        >
          <Link href="/">
            <Button variant="primary" className="rounded-[20px] gap-2 px-5 py-3 text-xs w-full sm:w-auto">
              <CornerDownLeft size={14} />
              <span>Back Home</span>
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="rounded-[20px] gap-2 px-5 py-3 text-xs w-full sm:w-auto">
              <span>View Catalog</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
