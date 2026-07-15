"use client";

import React, { useState } from 'react';
import { useCompare } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Button from './Button';
import CompareModal from './CompareModal';

export default function CompareBar() {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen
  } = useCompare();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-border/40 bg-card/90 backdrop-blur-md shadow-2xl flex items-center justify-center pointer-events-none"
        >
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto bg-card p-4 md:px-6 rounded-2xl border border-border/60 shadow-lg">
            
            {/* Items list */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <RefreshCw className="text-primary w-4 h-4 animate-spin-slow" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Compare ({compareList.length}/3)
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {compareList.map((product) => (
                  <div
                    key={product.id}
                    className="relative flex items-center gap-2 pl-2 pr-3 py-1.5 bg-muted/40 hover:bg-muted/70 rounded-full border border-border/40 transition-colors"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border/30 bg-muted/30">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground max-w-[80px] md:max-w-[120px] truncate">
                      {product.name}
                    </span>
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="text-muted-foreground hover:text-red-500 rounded-full transition-colors"
                      aria-label={`Remove ${product.name} from comparison`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Clear All
              </button>
              <Button
                variant="primary"
                size="sm"
                className="px-5 py-2.5 text-xs rounded-[20px]"
                disabled={compareList.length < 2}
                onClick={() => setIsModalOpen(true)}
              >
                Compare Now
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <CompareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
