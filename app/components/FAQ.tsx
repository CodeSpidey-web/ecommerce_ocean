"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../../lib/products';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionTitle from './SectionTitle';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <SectionTitle
        title="Frequently Asked Questions"
        subtitle="Got questions? We have answers. Check out our help resources below."
        badge="Support Center"
      />

      <div className="space-y-4">
        {faqs.map((item) => {
          const isOpen = openId === item.id;
          
          return (
            <div
              key={item.id}
              className="border border-border/40 bg-card/50 backdrop-blur-md rounded-2xl overflow-hidden glass-panel"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-foreground hover:bg-muted/30 transition-all gap-4"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>{item.question}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-muted-foreground leading-relaxed border-t border-border/20">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
