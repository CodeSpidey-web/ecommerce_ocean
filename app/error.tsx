"use client";

import React, { useEffect } from 'react';
import Button from './components/Button';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring services
    console.error("Runtime exception intercepted:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-md space-y-6 relative z-10 select-none">
        {/* Error icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto"
        >
          <AlertCircle size={32} />
        </motion.div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-foreground">Something went wrong!</h2>
          <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed max-w-xs mx-auto">
            An unexpected error occurred during rendering this page component.
          </p>
        </div>

        {/* Console details (safe mockup) */}
        {error.message && (
          <div className="p-3 bg-muted border border-border/60 rounded-xl max-w-sm mx-auto text-left overflow-x-auto text-[10px] font-mono text-muted-foreground">
            {error.message}
          </div>
        )}

        {/* Reset Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-2"
        >
          <Button
            variant="primary"
            onClick={reset}
            className="rounded-[20px] gap-2 px-5 py-3 text-xs"
          >
            <RotateCcw size={14} />
            <span>Try Again</span>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
